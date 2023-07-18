import "rc-time-picker/assets/index.css";
import "../dashboard/index.css";

import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { Form, Formik, FieldArray } from "formik";
import { useAppSelector, useAppDispatch } from "../../../store";
import { timeFormatInDb, weekDays } from "../../../common/constants";
import {
  getScheduleInventoryDataAsync,
  scheduleInventoryState,
  updateScheduleInventoryAsync,
} from "../scheduleInventory/scheduleInventory.slice";
import { Utils } from "../../../../utils/utils";

const timerPickerInitialState = {
  monday: [{ start_time: "", end_time: "" }],
  tuesday: [{ start_time: "", end_time: "" }],
  wednesday: [{ start_time: "", end_time: "" }],
  thursday: [{ start_time: "", end_time: "" }],
  friday: [{ start_time: "", end_time: "" }],
};

const timeObj = [
  {
    day: "monday",

    slots: [{ start_time: "08:00:00", end_time: "12:00:00" }],
  },
  {
    day: "tuesday",

    slots: [{ start_time: "04:00:00", end_time: "07:00:00" }],
  },
];

const TrainerDashboardContainer = () => {
  const { status, scheduleInventoryData } = useAppSelector(
    scheduleInventoryState
  );
  const dispatch = useAppDispatch();
  const [timePickerDiv, setTimePickerDiv] = useState(scheduleInventoryData);

  useEffect(() => {
    fetchScheduleInventoryData();
  }, []);

  useEffect(() => {
    // console.log("scheduleInventoryData", scheduleInventoryData);
    setTimePickerDiv(scheduleInventoryData);
  }, [status]);

  const fetchScheduleInventoryData = () => {
    dispatch(getScheduleInventoryDataAsync());
  };

  // const format = "h:mm a";
  const format = "HH:mm a";

  const handleOnSubmit = () => {};

  const handleAddSlots = (day) => {
    const emptySlot = { start_time: "", end_time: "" };
    const timePickrObj = [...timePickerDiv[day], emptySlot];
    setTimePickerDiv({ ...timePickerDiv, [day]: timePickrObj });
  };

  const handleRemoveSlots = (day, index) => {
    console.log("day", day, "index", index);
    const slots = [...timePickerDiv[day]];
    console.log("slots", [...timePickerDiv[day]]);
    slots.splice(index, 1);
    console.log("slotsssss", slots);
    timePickerDiv[day] = slots;
    setTimePickerDiv({ ...timePickerDiv });
  };

  return (
    <div>
      <div className="m-25 header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Schedule Inventory
        </h3>
      </div>
      <div className="px-5 pt-3 m-25">
        <Formik
          initialValues={timeObj}
          // validationSchema={}
          onSubmit={() => {}}
        >
          {({ errors, touched, values, setValues }) => (
            <Form>
              {values.map(({ day, slots }, index) => {
                return (
                  <div key={index} className="row my-4">
                    <div className="col-1"></div>
                    <div className="col-4 text-capitalize">
                      <h4>{day}</h4>
                      {/* <h4>{JSON.stringify(values)}</h4> */}
                    </div>

                    <FieldArray name="slots">
                      {({ remove, push, insert }) => {
                        return (
                          <div className="col-6">
                            {JSON.stringify(slots)}
                            {/* values.slot */}
                            {slots.map((time, slotIndex) => {
                              return (
                                <button
                                  type="button"
                                  className="btn btn-circle bg-primary text-white"
                                  // onClick={() => handleAddSlots(day)}
                                  onClick={() => {
                                    alert("Inside");
                                    push("");
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              );
                            })}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                );
              })}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TrainerDashboardContainer;
