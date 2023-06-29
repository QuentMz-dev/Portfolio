import { readThunk } from "./getSkills.api";
import { getItems, removeItems } from "../../utils/storage.utils";
import { readMessagesThunk } from "./getMessage.api";

const deleteMessage = async (id) => {
  const token = getItems("acces_token");

  const message = {
    id: id,
  };

  const config = {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7001/messages/delete-one",
      config
    );
    const status = response.status;
    const result = await response.json();

    if (status >= 400) {
      return null;
    }

    if (!result || !result.deleted) {
      return null;
    } else {
      return result;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const deleteMessageThunk = (id) => {
  return async (dispatch, getState) => {
    const loading = getState().viewReducer.loading;
    if (loading) return;

    // dispatch({ type: "START_LOADING" });

    const response = await deleteMessage(id);

    // dispatch({ type: "STOP_LOADING" });

    if (!response) {
      removeItems("acces_token");
      return console.error("cannot delete message");
    } else {
      dispatch(readMessagesThunk(dispatch, getState)); // Appel direct de readThunk après la suppression réussie
    }
  };
};
