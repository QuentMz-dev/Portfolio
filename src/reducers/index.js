import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
//=======
import contactReducer from "./contactSlice";

import viewReducer from "./viewSlice";
import skillsReducer from "./skillsSlice";
import userReducer from "./userSlice";
import aboutReducer from "./aboutSlice";

const rootReducer = combineReducers({
  contactReducer,
  viewReducer,
  skillsReducer,
  userReducer,
  aboutReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
