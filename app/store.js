import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./components/auth/auth.slice";
import masterReducer from "./components/master/master.slice";
import scheduleInventoryReducer from "./components/trainer/scheduleInventory/scheduleInventory.slice";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      master: masterReducer,
      scheduleInventory: scheduleInventoryReducer,
    },
  });
};

const store = makeStore();

export default store;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
