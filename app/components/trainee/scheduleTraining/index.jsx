import Table from "rc-table";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../scheduleTraining/index.css";
import {
  bookTrainingSessionTableHeadingMockData,
  bookTrainingSessionTableMockData,
} from "../../../common/constants";
import { Utils } from "../../../../utils/utils";

const ScheduleTraining = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState(null);
  const Input = ({ onChange, placeholder, value, isSecure, id, onClick }) => (
    <div>
      <img
        className="mt-1 ml-2 mr-3 cursor-pointer"
        src={"../assets/images/arrow-left.svg"}
      />
      <span
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        isSecure={isSecure}
        id={id}
        onClick={onClick}
        className="select_date"
      >
        {Utils.formateDate(startDate)}
      </span>
      <img
        className="ml-3 arrow-right"
        src={"../assets/images/arrow-right.svg"}
      />
    </div>
  );

  return (
    <div>
      <div className="m-25 header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Book Training Session
        </h3>
      </div>
      <div>
        <div className="m-25 header">
          <div className="input-group">
            <input
              className="form-control border border-primary"
              type="search"
              id="Search"
              name="Search"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="m-25">
        <div className="row">
          <div className="">
            <DatePicker
              className="datePicker"
              onChange={(date) => setStartDate(date)}
              selected={startDate}
              customInput={<Input />}
            />
            <button
              type="button"
              className={"border mb-2btn btn-sm bg-white ml-2 border-dark"}
            >
              Week
            </button>
          </div>
        </div>
      </div>
      <Table
        key={"book-training-session"}
        className="ml-4 mt-4 book-table-session"
        scroll={{ x: 1500, y: 600 }}
        columns={bookTrainingSessionTableHeadingMockData}
        data={bookTrainingSessionTableMockData}
      />
    </div>
  );
};

export default ScheduleTraining;
