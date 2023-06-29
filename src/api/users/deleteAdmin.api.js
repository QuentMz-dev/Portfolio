import { getItems } from "../../utils/storage.utils";

const deleteAdminApi = async (oldAdmin) => {
  const token = getItems("acces_token");
  const form = oldAdmin;

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
      "http://localhost:7007/users/delete-admin",
      config
    );
    const status = response.status;
    const result = await response.json();

    return {
      message: result.message,
      status,
    };
  } catch (e) {
    console.error("Problem with request deleteAdmin: ", e.message);
    return null;
  }
};

export const deleteAdminThunk = async (dispatch, getState, form) => {
  const loading = getState().viewReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });

  const response = await deleteAdminApi(form);

  dispatch({ type: "STOP_LOADING" });

  if (!response) return console.error("cannot delete this Admin actually");
};
