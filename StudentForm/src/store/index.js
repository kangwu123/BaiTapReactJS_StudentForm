import { configureStore } from "@reduxjs/toolkit";
import studentRegisterReducer from "./../component/slice";

const Store = configureStore({
  reducer: {
    studentRegisterReducer,
  },
});
export default Store;
