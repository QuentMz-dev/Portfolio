import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userName: "",
  email: "",
  message: "",
  messages: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState: INITIAL_STATE,
  reducers: {
    updateField: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    clearFields: () => INITIAL_STATE,
    initMessages: (state, action) => {
      return {
        ...state,
        messages: action.payload,
      };
    },
  },
});

export const { updateField, clearFields, initMessages } = contactSlice.actions;
export default contactSlice.reducer;
