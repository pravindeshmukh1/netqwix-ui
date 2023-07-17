import Table from "rc-table";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "../scheduleTraining/index.css";
import {
  bookTrainingSessionTableHeadingMockData,
  bookTrainingSessionTableMockData,
  params,
} from "../../../common/constants";
import { Utils } from "../../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getTraineeWithSlotsAsync, traineeState } from "../trainee.slice";

const ScheduleTraining = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const [getParams, setParams] = useState(params);
  const { getTraineeSlots } = useAppSelector(traineeState);
  useEffect(() => {
    dispatch(getTraineeWithSlotsAsync(getParams));
  }, [getParams]);
  const Input = ({ onChange, placeholder, value, isSecure, id, onClick }) => (
    <div>
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
    </div>
  );

  return (
    <div>
      <div className="m-25 header">
        <h3 className="fs-1 p-3 mb-2 bg-primary text-white rounded">
          Book Training Session
        </h3>
      </div>
      <div
        className={`form-inline search-form open mb-5`}
        style={{
          width: "92vw",
          height: "4rem",
          marginTop: "60px",
          marginLeft: "6rem",
        }}
      >
        <div className="form-group">
          <input
            className="form-control-plaintext"
            type="search"
            value={getParams.search}
            placeholder="Search..."
            onChange={(event) => {
              const { value } = event.target;
              setParams({ search: value });
            }}
          />
        </div>
        <div className="mt-3 ml-1">
          <DatePicker
            className="datePicker"
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            customInput={<Input />}
          />
        </div>
      </div>
      <div className="pt-5" style={{ marginTop: "6rem" }}>
        <Table
          key={"book-training-session"}
          className="ml-4 book-table-session"
          scroll={{ x: 1500, y: 600 }}
          columns={bookTrainingSessionTableHeadingMockData}
          data={bookTrainingSessionTableMockData}
        />
      </div>
    </div>
  );
};

export default ScheduleTraining;
