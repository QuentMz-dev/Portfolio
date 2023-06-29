import { getItems, removeItems } from "../../utils/storage.utils";
import { readThunk } from "../events/getdata.api";
import { viewSlice } from "../../reducers/viewSlice";

const checkRole = async (token) => {
  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7007/users/check-role",
      config
    );
    const status = response.status;
    const result = await response.json();

    if (status >= 400) {
      return null;
    }

    if (!result || !result.role) {
      return null;
    } else {
      return result;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);

    return null;
  }
};

export const checkRoleThunk = async (dispatch, getState) => {
  const loading = getState().viewSlice.loading;
  if (loading) return;

  const token = getItems("acces_token");

  if (!token) {
    dispatch(isLogged());

    return dispatch(readThunk);
  }

  dispatch(loadingRole());

  const response = await checkRole(token);

  dispatch(loadingRole());

  // Si plus bon :
  // disconnect ?
  // role : 2
  if (response) {
    dispatch(isLogged());

    dispatch(updateView({ key: "userId", value: response.id }));
    dispatch(updateView({ key: "role", value: response.role }));

    dispatch(readThunk);
  }

  if (!response) {
    removeItems("acces_token");
    return console.error("cannot reaload your role, please signUp");
  }
};
