import { closeModal, updateView } from "../../reducers/viewSlice";
import { hash } from "../../utils/crypto.utils";
import { setItems } from "../../utils/storage.utils";

export const signInApi = async (form) => {
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch("http://localhost:7001/users/sign-in", config);
    const status = response.status;
    const result = await response.json();

    if (status < 400) {
      setItems("acces_token", result.token);
    }

    return {
      message: result.message,
      data: result?.data ? result.data : null,
      role: result.role,
      status,
    };

    // TEST TOKEN
  } catch (e) {
    console.error("Problem with request : ", e.message);

    return null;
  }
};

export const signInThunk = async (dispatch, getState, form) => {
  const loading = getState().viewReducer.loading;
  if (loading) return;

  const response = await signInApi({
    ...form,
    password: hash(form.password),
  });

  if (!response.data) {
    // dispatch({
    //   type: "UPDATE_ERROR",
    //   payload: { key: `errSignIn`, value: `${response.message}` },
    // });
    console.error("cannot signIn actually");
    return null;
  }

  if (response.data) {
    console.log("response", response);
    dispatch(updateView({ key: "role", value: response.role }));
    dispatch(closeModal());
  }
};
