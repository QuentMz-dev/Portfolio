import { initAbout } from "../../reducers/aboutSlice";
import { toggleBooleanView } from "../../reducers/viewSlice";
import { getItems } from "../../utils/storage.utils";

export const getAbout = async () => {
  const token = getItems("acces_token");

  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch(`http://localhost:7001/about/read`, config);
    const result = await response.json();
    console.log("result", result);
    if (!result) {
      return null;
    } else {
      return result;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const readAboutThunk = () => {
  return (dispatch, getState) => {
    // Ne pas utiliser "async" ici
    const loading = getState().viewReducer.loading;

    // dispatch(toggleBooleanView({ key: "loading" }));

    getAbout()
      .then((response) => {
        // dispatch(toggleBooleanView({ key: "loading" }));
        console.log("response", response);
        if (!response) {
          console.error("Cannot load about section");
        } else {
          const lastOne = response.about.length - 1;
          dispatch(initAbout(response.about[lastOne]));
        }
      })
      .catch((error) => {
        console.error("Problem with request: ", error.message);
      });
  };
};
