import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    updateFieldUser: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    clearFieldsUser: () => INITIAL_STATE,
  },
});

export const { updateFieldUser, clearFieldsUser } = userSlice.actions;
export default userSlice.reducer;
