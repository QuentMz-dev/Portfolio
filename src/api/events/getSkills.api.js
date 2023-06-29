// import { ROLE } from "../../constants/constants-booking";
// import { getItems } from "../../utils/storage.utils";
import { initSkills } from "../../reducers/skillsSlice";
import { toggleBooleanView } from "../../reducers/viewSlice";

export const getSkills = async () => {
  const config = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch(`http://localhost:7001/skills/read`, config);
    const result = await response.json();

    if (!result) {
      return null;
    } else {
      return result.skills;
    }
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const readThunk = () => {
  return (dispatch, getState) => {
    // Ne pas utiliser "async" ici
    const loading = getState().viewReducer.loading;

    if (loading) {
      return null;
    }

    dispatch(toggleBooleanView({ key: "loading" }));
    getSkills()
      .then((response) => {
        dispatch(toggleBooleanView({ key: "loading" }));

        if (!response) {
          console.error("Cannot load planning");
        } else {
          dispatch(initSkills(response));
        }
      })
      .catch((error) => {
        console.error("Problem with request: ", error.message);
      });
  };
};
