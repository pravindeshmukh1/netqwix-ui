import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./components/auth/auth.slice";
import masterReducer from "./components/master/master.slice";
import traineeReducer from "./components/trainee/trainee.slice";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      master: masterReducer,
      trainee: traineeReducer,
    },
  });
};

const store = makeStore();

export default store;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
