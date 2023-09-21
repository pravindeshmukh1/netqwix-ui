import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./components/auth/auth.slice";
import masterReducer from "./components/master/master.slice";
import scheduleInventoryReducer from "./components/trainer/scheduleInventory/scheduleInventory.slice";
import traineeReducer from "./components/trainee/trainee.slice";
import trainerReducer from "./components/trainer/trainer.slice";
import bookingsReducer from "./components/common/common.slice";
import commonReducer from "./components/common/common.slice";

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      master: masterReducer,
      scheduleInventory: scheduleInventoryReducer,
      trainee: traineeReducer,
      trainer: trainerReducer,
      bookings: bookingsReducer,
      common: commonReducer,
    },
  });
};

const store = makeStore();

export default store;

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;
