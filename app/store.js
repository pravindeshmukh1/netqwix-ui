import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./components/auth/auth.slice";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const store = makeStore();

export default store;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
