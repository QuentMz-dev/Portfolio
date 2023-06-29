import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  isLogged: false,
  userId: "",
  showModal: false,
  role: "",
};

const viewSlice = createSlice({
  name: "view",
  initialState: INITIAL_STATE,
  reducers: {
    updateView: (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    toggleBooleanView: (state, action) => {
      const { key } = action.payload;
      return {
        ...state,
        [key]: !state[key],
      };
    },
    closeModal: (state) => ({
      ...state,
      showModal: false,
    }),
  },
});

export const { updateView, toggleBooleanView, closeModal } = viewSlice.actions;
export default viewSlice.reducer;
