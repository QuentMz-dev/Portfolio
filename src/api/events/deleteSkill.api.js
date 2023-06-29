import { readThunk } from "./getSkills.api";
import { getItems, removeItems } from "../../utils/storage.utils";

const deleteSkill = async (id) => {
  const token = getItems("acces_token");

  const skill = {
    id: id,
  };

  const config = {
    method: "POST",
    body: JSON.stringify(skill),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7001/skills/delete-one",
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

export const deleteSkillThunk = (id) => {
  return async (dispatch, getState) => {
    const loading = getState().viewReducer.loading;
    if (loading) return;

    // dispatch({ type: "START_LOADING" });

    const response = await deleteSkill(id);
    console.log(response);

    // dispatch({ type: "STOP_LOADING" });

    if (!response) {
      removeItems("acces_token");
      return console.error("cannot delete skill");
    } else {
      dispatch(readThunk(dispatch, getState)); // Appel direct de readThunk après la suppression réussie
    }
  };
};
