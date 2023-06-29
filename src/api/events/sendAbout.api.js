import { clearFieldsAbout } from "../../reducers/aboutSlice";
import { getItems } from "../../utils/storage.utils";
import { readAboutThunk } from "./getAbout.api";

export const sendAbout = async (aboutReducer) => {
  const newAbout = {
    text: aboutReducer.text,
  };
  const token = getItems("acces_token");
  const config = {
    method: "POST",
    body: JSON.stringify(newAbout),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7001/about/post-one",
      config
    );
    const status = response.status;
    const result = await response.json();
    console.log("result", result);

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

export const sendAboutThunk = (aboutReducer) => {
  return async (dispatch, getState) => {
    const response = await sendAbout(aboutReducer);
    console.log("response", response);

    if (!response) {
      removeItems("acces_token");
      return console.error("cannot send about");
    } else {
      dispatch(readAboutThunk());
      dispatch(clearFieldsAbout());
    }
  };
};
