import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import eventReducer from "../slices/event";

const reducer = {
  auth: authReducer,
  event: eventReducer,
  message: messageReducer,
};

const store = configureStore({
  devTools: true,
  reducer,
});

export default store;
