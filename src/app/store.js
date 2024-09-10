import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/AuthSlice";
// import colorReducer from "../features/colorSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // colors: colorReducer,
  },
});
