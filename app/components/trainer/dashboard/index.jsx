import "rc-time-picker/assets/index.css";
import "../dashboard/index.css";

import React, { useState } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { weekDays } from "../../../common/constants";

const timerPickerInitialState = {
  Monday: [{ start_date: "", end_date: "" }],
  Tuesday: [{ start_date: "", end_date: "" }],
  Wednesday: [{ start_date: "", end_date: "" }],
  Thursday: [{ start_date: "", end_date: "" }],
  Friday: [{ start_date: "", end_date: "" }],
};

const TrainerDashboardContainer = () => {
  const [timePickerDiv, setTimePickerDiv] = useState(timerPickerInitialState);

  const format = "h:mm a";

  const handleOnSubmit = () => {};

  const handleAddSlots = () => {};

  const handleStartDate = (value) => {
    console.log(value && value.format(format));
  };

  return (
    <div>
      <div className="m-25 header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Schedule Inventory
        </h3>
      </div>
      <div className="px-5 pt-3 m-25">
        <div>
          <form>
            {weekDays.map((day, index) => {
              return (
                <div key={index} className="row my-4">
                  <div className="col-4">
                    <h4>{day}</h4>
                  </div>
                  {/* {timePickerDiv[day].map((timePickerDiv, index) => { */}
                  <div className="col-6">
                    <div className="row">
                      <div className="col-6">
                        {" "}
                        <TimePicker
                          defaultValue={moment()}
                          showSecond={false}
                          minuteStep={15}
                          use12Hours
                          onChange={handleStartDate}
                        />
                      </div>
                      <div className="col-6">
                        {" "}
                        <TimePicker
                          disabled
                          defaultValue={moment()}
                          showSecond={false}
                          minuteStep={15}
                          use12Hours
                          // onChange={handleEndDate}
                        />
                      </div>
                    </div>
                  </div>
                  {/* })} */}
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-circle bg-primary text-white"
                      onClick={() => handleAddSlots()}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="row mt-4">
              <div className="col-12"></div>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => handleOnSubmit()}
              >
                Submit Your Scheduling
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboardContainer;
