import { initMessages } from "../../reducers/contactSlice";
import { toggleBooleanView } from "../../reducers/viewSlice";
import { getItems } from "../../utils/storage.utils";

export const getMessages = async () => {
  const token = getItems("acces_token");

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(`http://localhost:7001/messages/read`, config);
    const result = await response.json();
    console.log("result", result);
    if (!result) {
      return null;
    } else {
      return result.message;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const readMessagesThunk = () => {
  return (dispatch, getState) => {
    // Ne pas utiliser "async" ici
    const loading = getState().viewReducer.loading;

    dispatch(toggleBooleanView({ key: "loading" }));
    getMessages()
      .then((response) => {
        dispatch(toggleBooleanView({ key: "loading" }));
        console.log("response", response);
        if (!response) {
          console.error("Cannot load messages");
        } else {
          dispatch(initMessages(response));
        }
      })
      .catch((error) => {
        console.error("Problem with request: ", error.message);
      });
  };
};
