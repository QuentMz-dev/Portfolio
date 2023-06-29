import { getItems } from "../../utils/storage.utils";

const setAdminApi = async (newAdmin) => {
  const token = getItems("acces_token");
  const form = newAdmin;

  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7007/users/set-admin",
      config
    );
    const status = response.status;
    const result = await response.json();

    return {
      message: result.message,
      status,
    };
  } catch (e) {
    console.error("Problem with request setAdmin: ", e.message);
    return null;
  }
};

export const setAdminThunk = async (dispatch, getState, form) => {
  const loading = getState().viewReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await setAdminApi(form);

  dispatch({ type: "STOP_LOADING" });

  if (!response) return console.error("cannot setAdmin actually");
};
