import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import goalsSlice from "./goalsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    goals: goalsSlice,
  },
});

export default store;
