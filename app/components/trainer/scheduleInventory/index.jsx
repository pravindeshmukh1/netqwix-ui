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

const ScheduleInventory = () => {
  const { status, scheduleInventoryData } = useAppSelector(
    scheduleInventoryState
  );
  const dispatch = useAppDispatch();
  const [timePickerDiv, setTimePickerDiv] = useState(scheduleInventoryData);

  useEffect(() => {
    fetchScheduleInventoryData();
  }, []);

  useEffect(() => {
    setTimePickerDiv(scheduleInventoryData);
  }, [status]);

  const fetchScheduleInventoryData = () => {
    dispatch(getScheduleInventoryDataAsync());
  };

  const emptySlot = {
    start_time: "",
    end_time: "",
  };

  return (
    <div className="m-25 schedule-inventory">
      <div id="header" className="header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Schedule Slots
        </h3>
      </div>
      <div id="slots" className="px-5 pt-3 m-25">
        <Formik
          initialValues={scheduleInventoryData}
          enableReinitialize
          // validationSchema={}
          onSubmit={(value) => {
            const updateSlotsPayload = {
              available_slots: value,
            };
            dispatch(updateScheduleInventoryAsync(updateSlotsPayload));
          }}
        >
          {({ errors, touched, values, setValues }) => (
            <Form>
              {values.map(({ day, slots }, parentIndex) => {
                return (
                  <div key={`schedule-inventory-${parentIndex}`}>
                    <div key={parentIndex} className="row my-4">
                      <div className="col-2" />
                      <div className="col-2 text-capitalize">
                        <h3>{day}</h3>
                      </div>
                      <FieldArray name="slots">
                        {({ remove, push }) => {
                          return (
                            <div className="col-8">
                              {slots.map((time, slotIndex) => {
                                return (
                                  <div
                                    key={`${slotIndex}-key`}
                                    className="row mb-3"
                                  >
                                    <div className="col-4">
                                      {" "}
                                      <TimePicker
                                        name="startTime"
                                        placeholder="Select time"
                                        defaultValue={
                                          time.start_time &&
                                          Utils.getFormattedTime(
                                            time.start_time
                                          )
                                        }
                                        showSecond={false}
                                        minuteStep={15}
                                        use12Hours
                                        onChange={(value) => {
                                          const formattedDate = value
                                            ? Utils.getFormattedDateDb(value)
                                            : "";
                                          const result = values[
                                            parentIndex
                                          ].slots.map((slot, index) => {
                                            if (index === slotIndex) {
                                              return {
                                                ...slot,
                                                start_time: formattedDate,
                                              };
                                            } else {
                                              return slot;
                                            }
                                          });
                                          console.log("result", result);
                                          const updatedValues = values.map(
                                            (value, index) => {
                                              if (index === parentIndex) {
                                                return {
                                                  ...value,
                                                  slots: result,
                                                };
                                              } else {
                                                return value;
                                              }
                                            }
                                          );
                                          setValues(updatedValues);
                                        }}
                                      />
                                    </div>
                                    <div className="col-4">
                                      {" "}
                                      <TimePicker
                                        placeholder="Select time"
                                        defaultValue={
                                          time.end_time &&
                                          Utils.getFormattedTime(time.end_time)
                                        }
                                        showSecond={false}
                                        minuteStep={15}
                                        use12Hours
                                        onChange={(value) => {
                                          const formattedDate = value
                                            ? Utils.getFormattedDateDb(value)
                                            : "";
                                          const result = values[
                                            parentIndex
                                          ].slots.map((slot, index) => {
                                            if (index === slotIndex) {
                                              return {
                                                ...slot,
                                                end_time: formattedDate,
                                              };
                                            } else {
                                              return slot;
                                            }
                                          });
                                          const updatedValues = values.map(
                                            (value, index) => {
                                              if (index === parentIndex) {
                                                return {
                                                  ...value,
                                                  slots: result,
                                                };
                                              } else {
                                                return value;
                                              }
                                            }
                                          );
                                          setValues(updatedValues);
                                        }}
                                      />
                                    </div>
                                    <div className="col-2">
                                      {slots.length - 1 === slotIndex && (
                                        <button
                                          type="button"
                                          className="btn btn-circle bg-primary text-white"
                                          onClick={() => {
                                            const addSlot = [
                                              ...values[parentIndex].slots,
                                              emptySlot,
                                            ];
                                            const updatedObj = {
                                              ...values[parentIndex],
                                              slots: addSlot,
                                            };
                                            const updatedValues = values.map(
                                              (value, index) => {
                                                if (index === parentIndex) {
                                                  return (value = updatedObj);
                                                } else {
                                                  return value;
                                                }
                                              }
                                            );
                                            setValues(updatedValues);
                                          }}
                                        >
                                          <i className="fa fa-plus"></i>
                                        </button>
                                      )}
                                      {slots.length - 1 !== slotIndex && (
                                        <button
                                          type="button"
                                          className="btn btn-circle bg-primary text-white"
                                          onClick={() => {
                                            const updatedDaySlots = values[
                                              parentIndex
                                            ].slots.filter((slot, index) => {
                                              return index !== slotIndex;
                                            });
                                            const updatedValues = values.map(
                                              (value, index) => {
                                                if (index === parentIndex) {
                                                  return {
                                                    ...value,
                                                    slots: updatedDaySlots,
                                                  };
                                                } else {
                                                  return value;
                                                }
                                              }
                                            );
                                            setValues(updatedValues);
                                          }}
                                        >
                                          <i className="fa fa-minus"></i>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <hr className="divider" />
                  </div>
                );
              })}
              {scheduleInventoryData.length && (
                <div className="row mt-5 justify-content-end">
                  <div className="col-12"></div>
                  <button
                    type="submit"
                    className="submit-schedule-inventory btn btn-primary"
                  >
                    Submit Your Scheduling
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ScheduleInventory;
