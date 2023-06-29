import { clearFields } from "../../reducers/contactSlice";
import { toggleBooleanView } from "../../reducers/viewSlice";

export const sendMessage = async (message) => {
  const newMessage = {
    name: message.userName,
    email: message.email,
    text: message.message,
  };

  const config = {
    method: "POST",
    body: JSON.stringify(newMessage),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7001/messages/post-one",
      config
    );
    const status = response.status;
    const result = await response.json();

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

export const sendMessageThunk = async (dispatch, getState, message) => {
  const loading = getState().viewReducer.loading;
  if (loading) return;

  dispatch(toggleBooleanView({ key: "loading" }));

  const response = await sendMessage(message);
  console.log("response", response);

  dispatch(toggleBooleanView({ key: "loading" }));

  if (!response.data) {
    // dispatch({
    //   type: "UPDATE_ERROR",
    //   payload: { key: `errSendLesson`, value: `${response.message}` },
    // });
    return console.error("cannot send message");
  }

  if (response.data) {
    // dispatch({ type: "SET_LAST_EDIT", payload: { value: response.data } });
    // dispatch({ type: "RESET_ERROR" });
    // await readThunk(dispatch, getState);
    dispatch(clearFields());
    // TODO : POP UP de CONFIRMATION + Validation
  }
};
