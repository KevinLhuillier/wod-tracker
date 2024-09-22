import { configureStore } from "@reduxjs/toolkit";
import wodReducer from "./wodSlice";

const store = configureStore({
  reducer: {
    wods: wodReducer,
  },
});

export default store;
