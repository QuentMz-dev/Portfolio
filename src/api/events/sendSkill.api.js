import { clearFieldsSkill } from "../../reducers/skillsSlice";
import { getItems } from "../../utils/storage.utils";
import { readThunk } from "./getSkills.api";

export const sendSkill = async (skillsReducer) => {
  const newSkill = {
    core: skillsReducer.core,
    name: skillsReducer.name,
    level: skillsReducer.level,
    certified: skillsReducer.certified,
  };
  const token = getItems("acces_token");
  const config = {
    method: "POST",
    body: JSON.stringify(newSkill),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(
      "http://localhost:7001/skills/post-one",
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

export const sendSkillThunk = (skillsReducer) => {
  return async (dispatch, getState) => {
    const response = await sendSkill(skillsReducer);
    console.log("response", response);

    if (!response) {
      removeItems("acces_token");
      return console.error("cannot delete skill");
    } else {
      dispatch(readThunk());
      dispatch(clearFieldsSkill());
    }
  };
};
