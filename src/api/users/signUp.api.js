import { hash } from "../../utils/crypto.utils";
import { setItems } from "../../utils/storage.utils";
import { stringAreFilled, stringIsFilled } from "../../utils/string.utils";

export const signUpApi = async (form) => {
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch("http://localhost:7001/users/sign-up", config);
    const status = response.status;
    const result = await response.json();

    if (status < 400) {
      setItems("acces_token", result.token);
    }

    return {
      message: result.message,
      data: result?.data ? result.data : null,
      status,
    };
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const signUpThunk = async (dispatch, getState, form) => {
  const loading = getState().viewReducer.loading;
  if (loading) return;

  if (!stringAreFilled([form.email, form.password])) {
    // dispatch({
    //   type: "UPDATE_ERROR",
    //   payload: { key: `errSignUp`, value: "incorrect_data" },
    // });
    return;
  }

  // dispatch({ type: "START_LOADING" });

  const response = await signUpApi({
    ...form,
    password: hash(form.password),
  });
  // dispatch({ type: "STOP_LOADING" });

  if (!response.data) {
    // dispatch({
    //   type: "UPDATE_ERROR",
    //   payload: { key: `errSignUp`, value: `${response.message}` },
    // });
    return console.error("cannot signUp actually");
  }
  if (response.data) {
    // dispatch({ type: "CLEAR_FIELD_SIGNUP" });
    // routeChange();
    console.log("create");
  }
};
