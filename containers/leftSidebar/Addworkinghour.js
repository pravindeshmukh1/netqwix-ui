import React from "react";
import TimePicker from "rc-time-picker";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authState } from "../../app/components/auth/auth.slice";
import { Utils } from "../../utils/utils";
import { Message, TimeZone } from "../../app/common/constants";
import { updateProfileAsync } from "../../app/components/trainer/trainer.slice";

const Addworkinghour = () => {
  const { userInfo } = useAppSelector(authState);
  const [workingHours, setWorkingHours] = useState({
    from: "09:00:00",
    to: "22:00:00",
    time_zone: "(GMT -5:00) Eastern Time (US & Canada)",
  });
  const [isTimeConflicts, setIsTimeConflicts] = useState(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    setWorkingHours(userInfo?.extraInfo?.working_hours)
  }, [userInfo]);

  return (
    <div className="card-body change-number Home" >
      <h5>Add your working hours...</h5>

      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-2">
          <p className="ml-2 From">From</p>
          <TimePicker

            name="from"
            className={`ml-2 mt-2 ${isTimeConflicts ? `border border-danger` : ``
              }  rounded`}
            placeholder="09:00 am"
            clearIcon={true}
            showSecond={false}
            minuteStep={5}
            value={Utils.getFormattedTime(workingHours?.from)}
            // defaultValue={
            //   userInfo &&
            //     userInfo?.extraInfo &&
            //     userInfo?.extraInfo?.working_hours
            //     ? Utils.getFormattedTime(
            //       userInfo?.extraInfo?.working_hours.from
            //     )
            //     : null
            // }
            use12Hours
            onChange={(value) => {
              if (value) {
                const fromTime =
                  Utils.getFormattedDateDb(value);
                const hasTimeConflicts = Utils.hasTimeConflicts(
                  fromTime,
                  workingHours.to
                );
                setIsTimeConflicts(hasTimeConflicts);
                setWorkingHours((prev) => ({
                  ...prev,
                  from: fromTime,
                }));
              }
            }}
          />
          {isTimeConflicts && (
            <label className="mt-2 ml-2 text-danger">
              {Message.timeConflicts}
            </label>
          )}
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-2">
          <p className="ml-2 To">To</p>
          <TimePicker
            name="to"
            className={`ml-2 mt-2 ${isTimeConflicts ? `border border-danger` : ``
              }  rounded`}
            clearIcon={true}
            value={Utils.getFormattedTime(workingHours?.to)}
            // defaultValue={
            //   userInfo &&
            //     userInfo?.extraInfo &&
            //     userInfo?.extraInfo?.working_hours
            //     ? Utils.getFormattedTime(
            //       userInfo?.extraInfo?.working_hours.to
            //     )
            //     : null
            // }
            placeholder="10:00 pm"
            showSecond={false}
            minuteStep={5}
            use12Hours
            onChange={(value) => {
              if (value) {
                const toTime = Utils.getFormattedDateDb(value);
                const hasTimeConflicts = Utils.hasTimeConflicts(
                  workingHours.from,
                  toTime
                );
                setIsTimeConflicts(hasTimeConflicts);
                setWorkingHours((prev) => ({
                  ...prev,
                  to: toTime,
                }));
              }
            }}
          />
          {isTimeConflicts && (
            <label className="mt-2 ml-2 text-danger">
              {Message.timeConflicts}
            </label>
          )}
        </div>
        <div className="col-8 col-sm-8 col-md-8 col-lg-8">
          <p className="ml-2 TimeZone">Time Zone</p>
          <select
            name="timezone_offset"
            id="timezone-offset"
            style={{ marginRight: "10px", maxWidth: "100%" }}
            className="timezone_offset mt-2 ml-2"
            value={workingHours?.time_zone}
            onChange={(event) => {
              const { value } = event.target;
              setWorkingHours((prev) => ({
                ...prev,
                time_zone: value,
              }));
            }}
          >
            {TimeZone.map(({ timezone, value }, index) => {
              return (
                <option key={`timezone_${index}`} value={value}>
                  {timezone}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-12 Save-button" style={{ marginTop: '10px' }}>
          <button
            type="button"
            className="ml-2 btn btn-sm btn-primary"
            disabled={isTimeConflicts}
            onClick={() => {
              const working_hours = {
                working_hours: workingHours,
              };
              if (working_hours) {
                dispatch(
                  updateProfileAsync({
                    extraInfo: {
                      ...userInfo?.extraInfo,
                      ...working_hours,
                    },
                  })
                );
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default Addworkinghour;
