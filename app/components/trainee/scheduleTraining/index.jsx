import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../scheduleTraining/index.css';
import { Popover } from 'react-tiny-popover'
import {
  params,
  weekDays,
} from '../../../common/constants';
import { Utils } from '../../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../store';
import { bookSessionAsync, getTraineeWithSlotsAsync, traineeState } from '../trainee.slice';
import moment from 'moment/moment';

const ScheduleTraining = () => {
  const dispatch = useAppDispatch();
  const { getTraineeSlots } = useAppSelector(traineeState);
  const [startDate, setStartDate] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [getParams, setParams] = useState(params);
  const [bookingColumns, setBookingColumns] = useState([]);
  const [bookingTableData, setBookingTableData] = useState([]);



  useEffect(
    () => {
      dispatch(getTraineeWithSlotsAsync(getParams));
    },
    [getParams]
  );

  useEffect(
    () => {
      const todaySDate = Utils.getDateInFormat(new Date());
      const { weekDates, weekDateFormatted } = Utils.getCurrentWeekByDate(todaySDate);
      setTableData(getTraineeSlots, weekDates);
      setColumns(weekDateFormatted);

    },
    [getTraineeSlots]
  );


  const setTableData = (data = [], selectedDate) => {
    const result = data.map(({ available_slots, category, email, fullname, profilePicture, trainer_id, _id }) => {
      const trainer_info = {
        category, email, fullname, profilePicture, trainer_id, _id
      };
      return {
        trainer_info,
        monday: { date: selectedDate[0], trainer_info, slot: getSlotByDate(available_slots, weekDays[0]) },
        tuesday: { date: selectedDate[1], trainer_info, slot: getSlotByDate(available_slots, weekDays[1]) },
        wednesday: { date: selectedDate[2], trainer_info, slot: getSlotByDate(available_slots, weekDays[2]) },
        thursday: { date: selectedDate[3], trainer_info, slot: getSlotByDate(available_slots, weekDays[3]) },
        friday: { date: selectedDate[4], trainer_info, slot: getSlotByDate(available_slots, weekDays[4]) },
      }
    })
    setBookingTableData(result);
  }


  const getSlotByDate = (slots = [], day) => {
    const slot = slots.find((slot) => slot?.day && slot?.day?.toLowerCase() === day?.toLowerCase()).slots || [];
    return slot.filter(({ start_time }) => start_time && start_time.length).map(({ start_time, end_time }) => { return { start_time: getSpliitedTime(start_time), end_time: getSpliitedTime(end_time) } })
  }


  const getSpliitedTime = (time = '') => {
    const splittedTime = time.split(":");
    return `${splittedTime[0]}:${splittedTime[1]}`;
  }

  const setColumns = (weeks = []) => {
    setBookingColumns([]);
    const initialHeader = {
      title: 'Available Trainers',
      dataIndex: 'trainer_info',
      key: 'Available_Trainers',
      width: 70,
      render: ({ category, email, fullname, profilePicture, trainer_id, _id }, record) => {
        return (<div className='text-center'>
          <img
            height={100}
            width={100}
            src={profilePicture}
            className="rounded"
          />
          <p
            for="exampleFormControlInput1"
            className="form-label mt-2"
          >
            {fullname}
          </p>
        </div>)
      }
    };



    const weekCols = weeks.map((week, index) => {
      return {
        title: week,
        // a key using which we'll show records
        dataIndex: `${week.split(' ')[0].toLowerCase()}`,
        key: `week-col-${index}`,
        width: 100,
      };
    });

    setBookingColumns([initialHeader, ...weekCols]);
  };


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

  const renderSlotsByDay = ({ slot, date, trainer_info }) => {
    return slot.map((content, index) =>
      <>
        <Popover
          isOpen={`${trainer_info._id}_${index}-${date.toString()}` === isPopoverOpen}
          positions={['top']} // if you'd like, you can limit the positions
          align={'center'}
          padding={5} // adjust padding here!
          reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
          onClickOutside={() => setIsPopoverOpen(null)} // handle click events outside of the popover/target here!
          content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
            <div style={{ zIndex: 5000 }}>
              <div class="alert alert-info m-20" role="alert">
                <p>
                  Want to schedule a meeting with <b>{trainer_info.fullname}?</b>
                </p>
                <button
                  type="button"
                  className="btn btn-primary p-1 active"
                  onClick={() => {
                    const payload = {
                      "trainer_id": trainer_info.trainer_id,
                      // TODO: get from constance
                      "status": "booked",
                      "booked_date": date,
                      "session_start_time": content.start_time,
                      "session_end_time": content.end_time
                    };
                    dispatch(bookSessionAsync(payload))
                    setIsPopoverOpen(null);

                  }}
                >
                  Book slot now
                </button>
              </div>

            </div>
          )}
        >

          <div
            onClick={() => {
              setIsPopoverOpen(`${trainer_info._id}_${index}-${date.toString()}`);

            }}
            key={`slot-${index}-content`} className="rounded-pill bg-primary text-white text-center p-1 mb-1 pointer">{Utils.convertToAmPm(content.start_time)} - {Utils.convertToAmPm(content.end_time)} </div>
        </Popover>
      </>
    )
  }

  const renderTable = () => (
    <div className='table-responsive'>
      <table class="table rc-table ml-30 mr-30">
        <thead className='justify-center align-center'>
          <tr>
            {bookingColumns.map((columns, index) => {
              return <th scope="col" key={`booking-col-${index}`}>{columns.title}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {bookingTableData && bookingTableData.length ? bookingTableData.map(({ trainer_info, monday,
            tuesday,
            wednesday,
            thursday,
            friday, }, index) =>
            <tr key={`table-data-${index}`}>
              <>
                <td>
                  <div className='text-center' onClick={() => {
                    // setIsPopoverOpen(trainer_info.fullname)
                  }}>
                    <img
                      height={100}
                      width={100}
                      src={trainer_info.profilePicture}
                      className="rounded"
                    />
                    <p
                      for="exampleFormControlInput1"
                      className="form-label mt-2"
                    >
                      {trainer_info.fullname}
                    </p>
                  </div>
                </td>
                <td>
                  {renderSlotsByDay(monday)}
                </td>
                <td>{renderSlotsByDay(tuesday)}</td>
                <td>{renderSlotsByDay(wednesday)}</td>
                <td>{renderSlotsByDay(thursday)}</td>
                <td>{renderSlotsByDay(friday)}</td>
              </>
            </tr>
          ) : <tr className='no-data'>
            <td colspan="6">
              No data available.
            </td>
          </tr>}


        </tbody>
      </table>
    </div>
  )

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
          width: '92vw',
          height: '4rem',
          marginTop: '60px',
          marginLeft: '6rem',
        }}
      >
        <div className="form-group">
          <input
            className="form-control-plaintext"
            type="search"
            value={getParams.search}
            placeholder="Search..."
            onChange={event => {
              const { value } = event.target;
              setParams({ search: value });
            }}
          />
        </div>
        <div className="mt-3 ml-1 datePicker">
          <DatePicker
            minDate={moment().toDate()}
            onChange={date => {
              setStartDate(date);
              const todaySDate = Utils.getDateInFormat(date.toString());
              const { weekDateFormatted, weekDates } = Utils.getCurrentWeekByDate(
                todaySDate
              );
              setColumns(weekDateFormatted);
              setTableData(getTraineeSlots, weekDates);
              setColumns(weekDateFormatted);

            }}
            selected={startDate}
            customInput={<Input />}
          />
        </div>
      </div>
      <div className="pt-5" style={{ marginTop: '6rem' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default ScheduleTraining;
