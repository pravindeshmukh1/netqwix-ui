import "rc-time-picker/assets/index.css";
import "../dashboard/index.css";

import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { Form, Formik, FieldArray, validateYupSchema } from "formik";
import { useAppSelector, useAppDispatch } from "../../../store";
import {
  Message,
  isInvalidForm,
  timeFormatInDb,
  weekDays,
} from "../../../common/constants";
import {
  getScheduleInventoryDataAsync,
  scheduleInventoryState,
  updateScheduleInventoryAsync,
} from "../scheduleInventory/scheduleInventory.slice";
import { Utils } from "../../../../utils/utils";
import { toast } from "react-toastify";

const ScheduleInventory = () => {
  const { status, scheduleInventoryData } = useAppSelector(
    scheduleInventoryState
  );
  const dispatch = useAppDispatch();
  const [timePickerDiv, setTimePickerDiv] = useState(scheduleInventoryData);
  const [isError, setIsError] = useState(false);

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
    error: false,
    timeConflict: false,
  };

  const handleStartTimeChange = (
    value,
    values,
    parentIndex,
    slotIndex,
    setFormValues
  ) => {
    const formattedDate = value ? Utils.getFormattedDateDb(value) : "";
    // Check for slot time conflict
    const hasTimeConflict = values[parentIndex].slots.some((slot, index) => {
      if (index !== slotIndex) {
        return (
          formattedDate >= slot.start_time && formattedDate <= slot.end_time
        );
      }
      return false;
    });

    const updatedSlots = values[parentIndex].slots.map((slot, index) => {
      if (index === slotIndex) {
        return {
          ...slot,
          start_time: formattedDate,
          error: slot.end_time && slot.end_time <= formattedDate,
          timeConflict: hasTimeConflict,
        };
      } else {
        return slot;
      }
    });

    const updatedValues = values.map((value, index) => {
      if (index === parentIndex) {
        return {
          ...value,
          slots: updatedSlots,
        };
      } else {
        return value;
      }
    });

    setFormValues(updatedValues);
  };

  const handleEndTimeChange = (
    value,
    values,
    parentIndex,
    slotIndex,
    setFormValues
  ) => {
    const formattedDate = value ? Utils.getFormattedDateDb(value) : "";

    const updatedSlots = values[parentIndex].slots.map((slot, index) => {
      if (index === slotIndex) {
        return {
          ...slot,
          end_time: formattedDate,
          error: slot.start_time >= formattedDate,
        };
      } else {
        return slot;
      }
    });

    const updatedValues = values.map((value, index) => {
      if (index === parentIndex) {
        return {
          ...value,
          slots: updatedSlots,
        };
      } else {
        return value;
      }
    });
    setFormValues(updatedValues);
  };

  const handleCheckIsError = (values) => {
    let isError = false;
    values.forEach((data) => {
      data.slots.forEach((slot) => {
        if (slot.error || slot.timeConflict) {
          isError = true;
        }
      });
    });
    setIsError(isError);
    return isError;
  };

  const handleAddSlotToDaySlots = (parentIndex, values, setValues) => {
    const addSlot = [...values[parentIndex].slots, emptySlot];
    const updatedObj = {
      ...values[parentIndex],
      slots: addSlot,
    };
    const updatedValues = values.map((value, index) => {
      if (index === parentIndex) {
        return (value = updatedObj);
      } else {
        return value;
      }
    });
    setValues(updatedValues);
  };

  const handleRemoveDaySlots = (parentIndex, slotIndex, values, setValues) => {
    const updatedValues = values.map((value, index) => {
      if (index === parentIndex) {
        const updatedSlots = value.slots.filter(
          (_, slotIndexToRemove) => slotIndexToRemove !== slotIndex
        );
        return { ...value, slots: updatedSlots };
      }
      return value;
    });
    setValues(updatedValues);
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
            // Filtering out empty slots before submitting
            const filteredSlots = value.map((day) => ({
              ...day,
              slots: day.slots.filter(
                (slot) => slot.start_time || slot.end_time
              ),
            }));

            const updateSlotsPayload = {
              available_slots: filteredSlots,
            };

            const isNotValid = Utils.checkTimeConflicts(filteredSlots);

            if (isNotValid) {
              toast.error(isInvalidForm, { type: "error" });
            } else {
              dispatch(updateScheduleInventoryAsync(updateSlotsPayload));
            }
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
                                      <TimePicker
                                        name="startTime"
                                        className={`${
                                          (values[parentIndex].slots[slotIndex]
                                            .error ||
                                            values[parentIndex].slots[slotIndex]
                                              .timeConflict) === true &&
                                          "border border-danger"
                                        }`}
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
                                        onChange={(value) =>
                                          handleStartTimeChange(
                                            value,
                                            values,
                                            parentIndex,
                                            slotIndex,
                                            setValues
                                          )
                                        }
                                      />
                                      {values[parentIndex].slots[slotIndex]
                                        .error === true ? (
                                        <p className="text-danger mt-1">
                                          {Message.errorMessage.invalidTime}
                                        </p>
                                      ) : (
                                        values[parentIndex].slots[slotIndex]
                                          .timeConflict === true && (
                                          <p className="text-danger mt-1">
                                            {Message.errorMessage.timeConflicts}
                                          </p>
                                        )
                                      )}
                                    </div>
                                    <div className="col-4">
                                      {" "}
                                      <TimePicker
                                        placeholder="Select time"
                                        defaultValue={
                                          time.end_time &&
                                          Utils.getFormattedTime(time.end_time)
                                        }
                                        className={`${
                                          values[parentIndex].slots[slotIndex]
                                            .error === true &&
                                          "border border-danger"
                                        }`}
                                        showSecond={false}
                                        minuteStep={15}
                                        use12Hours
                                        onChange={(value) =>
                                          handleEndTimeChange(
                                            value,
                                            values,
                                            parentIndex,
                                            slotIndex,
                                            setValues
                                          )
                                        }
                                      />
                                      {values[parentIndex].slots[slotIndex]
                                        .error === true && (
                                        <p className="text-danger mt-1">
                                          {Message.errorMessage.invalidTime}
                                        </p>
                                      )}
                                    </div>
                                    <div class="d-flex justify-content-around">
                                    {slotIndex === 0 && ( <button
                                        className="btn btn-circle bg-primary text-white"
                                        type="button"
                                        disabled={
                                          values[parentIndex].slots[slotIndex]
                                            .timeConflict ||
                                          values[parentIndex].slots[slotIndex]
                                            .error
                                        }
                                        onClick={() =>
                                          handleAddSlotToDaySlots(
                                            parentIndex,
                                            values,
                                            setValues
                                          )
                                        }
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>)}
                                      {slotIndex !== 0 && (
                                        <button
                                          className="btn btn-circle bg-primary text-white"
                                          type="button"
                                          onClick={() =>
                                            handleRemoveDaySlots(
                                              parentIndex,
                                              slotIndex,
                                              values,
                                              setValues
                                            )
                                          }
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
                    disabled={handleCheckIsError(values)}
                    type="submit"
                    className={`submit-schedule-inventory btn btn-primary`}
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
