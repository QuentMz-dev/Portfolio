import { createSlice } from "@reduxjs/toolkit";
import { SKILLS_TYPE } from "../constants/constants-personnal";

const INITIAL_STATE = {
  frontEndArr: [],
  backEndArr: [],
  otherArr: [],
  core: SKILLS_TYPE[0].value,
  name: "",
  level: "",
  certified: false,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState: INITIAL_STATE,
  reducers: {
    initSkills: (state, action) => {
      return {
        ...state,
        frontEndArr: [
          ...action.payload.filter((index) => index.core === "frontEnd"),
        ],
        backEndArr: [
          ...action.payload.filter((index) => index.core === "backEnd"),
        ],
        otherArr: [...action.payload.filter((index) => index.core === "other")],
      };
    },
    updateFieldSkill: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    switchBoolean: (state) => {
      return {
        ...state,
        certified: !state.certified,
      };
    },
    clearFieldsSkill: () => INITIAL_STATE,
  },
});

export const { initSkills, updateFieldSkill, clearFieldsSkill, switchBoolean } =
  skillsSlice.actions;
export default skillsSlice.reducer;
