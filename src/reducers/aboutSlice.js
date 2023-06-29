import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  text: "",
};

const aboutSlice = createSlice({
  name: "about",
  initialState: INITIAL_STATE,
  reducers: {
    updateFieldAbout: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    clearFieldsAbout: () => INITIAL_STATE,
    initAbout: (state, action) => {
      return {
        ...state,
        text: action.payload.text,
      };
    },
  },
});

export const { updateFieldAbout, clearFieldsAbout, initAbout } =
  aboutSlice.actions;
export default aboutSlice.reducer;
