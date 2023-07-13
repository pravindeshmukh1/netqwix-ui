import React, { useState } from "react";
import Table from "rc-table";
import "../scheduleTraining/index.css";
import {
  bookTrainingSessionDayTableHeadingMockData,
  bookTrainingSessionDayTableMockData,
  bookTrainingSessionTableHeadingMockData,
  bookTrainingSessionTableMockData,
  filterOption,
  trainers,
  week,
} from "../../../common/constants";
import { Autocomplete } from "../../../common/autocomplete";
import { DatePicker } from "../../../common/calendar";

const ScheduleTraining = () => {
  const [selectFilter, setSelectFilter] = useState(filterOption.week);
  return (
    <div>
      <div className="m-25 header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Book Training Session
        </h3>
      </div>
      <div className="pt-3 m-25">
        <div className="row">
          <div className="col col-lg-2">
            <h5 for="exampleFormControlInput1" className="form-label mb-1">
              Search by Trainer Name
            </h5>
            <Autocomplete
              options={trainers}
              isMulti={true}
              name={"trainers"}
              key={"trainers"}
              isClearable={false}
              placeholder={"Select"}
            />
          </div>
          <div className="ml-3 col col-lg-2">
            <h5 for="exampleFormControlInput1" className="form-label mb-1">
              Search by Date
            </h5>
            <Autocomplete
              options={week}
              isMulti={true}
              name={"week"}
              key={"week"}
              isClearable={false}
              placeholder={"Select"}
            />
          </div>
          <div className="col-sm mt-3">
            <button type="button" className="btn btn-primary btn-sm">
              Schedule instant Meeting
            </button>
          </div>
        </div>
      </div>
      <div className="m-25">
        <div className="row">
          <div className="col col-lg-2">
            <DatePicker onChange={() => {}} value={null} />
          </div>
          <div className="ml-3 col col-lg-2">
            <button
              type="button"
              className={`border 
          ${selectFilter === filterOption.day && `border-primary`}
          mb-2btn btn-sm bg-white`}
              onClick={() => setSelectFilter("Day")}
            >
              Day
            </button>
            <button
              type="button"
              className={`border ${
                selectFilter === filterOption.week && `border-primary`
              } mb-2btn btn-sm bg-white ml-2`}
              onClick={() => setSelectFilter("Week")}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      <Table
        className="ml-4 mt-4 book-table-session"
        scroll={{ x: 1500, y: 600 }}
        columns={
          selectFilter === filterOption.week
            ? bookTrainingSessionTableHeadingMockData
            : bookTrainingSessionDayTableHeadingMockData
        }
        data={
          selectFilter === filterOption.week
            ? bookTrainingSessionTableMockData
            : bookTrainingSessionDayTableMockData
        }
      />
    </div>
  );
};

export default ScheduleTraining;
