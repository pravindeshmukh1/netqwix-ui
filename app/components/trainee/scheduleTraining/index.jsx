import Table from 'rc-table';
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
    console.log(`table data --- `, result);
    setBookingTableData(result);
  }


  const getSlotByDate = (slots = [], day) => {
    const slot = slots.find((slot) => slot?.day && slot?.day?.toLowerCase() === day?.toLowerCase()).slots || [];
    return slot.map(({ start_time, end_time }) => { return { start_time: getSpliitedTime(start_time), end_time: getSpliitedTime(end_time) } })
  }


  const getSpliitedTime = (time = '') => {
    const splittedTime = time.split(":");
    return `${splittedTime[0]}: ${splittedTime[1]}`
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
        render: ({ slot, trainer_info, date }, record) => {
          return slot.map((content, index) => {
            return (

              <Popover
                isOpen={`${trainer_info._id}_${index}-${date.toString()}` === isPopoverOpen}
                positions={['top', 'left']} // if you'd like, you can limit the positions
                padding={10} // adjust padding here!
                reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                onClickOutside={() => setIsPopoverOpen(null)} // handle click events outside of the popover/target here!
                content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                  <div style={{ zIndex: 5000 }}>
                    <button
                      type="button"
                      className="owl-prev"
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
                      <span>Book slot now</span>
                    </button>

                  </div>
                )}
              >
                <div
                  onClick={() => {
                    setIsPopoverOpen(`${trainer_info._id}_${index}-${date.toString()}`);
                  }}
                  key={`slot-${index}-content`} className="rounded-pill bg-primary text-white text-center mb-1 pointer">{content.start_time}-{content.end_time}</div>
              </Popover>
            )
          })

        }
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
          positions={['top', 'left']} // if you'd like, you can limit the positions
          padding={10} // adjust padding here!
          reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
          onClickOutside={() => setIsPopoverOpen(null)} // handle click events outside of the popover/target here!
          content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
            <div style={{ zIndex: 5000 }}>
              <button
                type="button"
                className="owl-prev"
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
                <span>Book slot now</span>
              </button>

            </div>
          )}
        >

          <div
            style={{ border: '1px solid red' }}
            onClick={() => {
              // console.log(`trainer_info.trainer_id + date === isPopoverOpen --- `, trainer_info.trainer_id + date === isPopoverOpen);
              setIsPopoverOpen(`${trainer_info._id}_${index}-${date.toString()}`);
              // console.log(`content --- `, trainer_info, date);

            }}
            key={`slot-${index}-content`} className="rounded-pill bg-primary text-white text-center mb-1 pointer">{content.start_time}-{content.end_time} </div>
        </Popover>
      </>
    )
  }

  const renderTable = () => (
    <table class="table">
      <thead>
        <tr>
          {bookingColumns.map((columns, index) => {
            return <th scope="col" key={`booking-col-${index}`}>{columns.title}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {bookingTableData.map(({ trainer_info, monday,
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
                {/* <Popover
                isOpen={monday.trainer_info._id === isPopoverOpen}
                positions={['top', 'left']} // if you'd like, you can limit the positions
                padding={10} // adjust padding here!
                reposition={true} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
                onClickOutside={() => setIsPopoverOpen(null)} // handle click events outside of the popover/target here!
                content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                  <div style={{ backgroundColor: 'red', zIndex: 5000 }}>
                    <div>Hi! I'm popover content. Here's my current position: {position}.</div>
                    <div>I'm {` ${nudgedLeft} `} pixels beyond my boundary horizontally!</div>
                    <div>I'm {` ${nudgedTop} `} pixels beyond my boundary vertically!</div>
                  </div>
                )}
              > */}
                {renderSlotsByDay(monday)}
                {/* </Popover> */}

              </td>
              <td>{renderSlotsByDay(tuesday)}</td>
              <td>{renderSlotsByDay(wednesday)}</td>
              <td>{renderSlotsByDay(thursday)}</td>
              <td>{renderSlotsByDay(friday)}</td>
            </>
          </tr>
        )}

      </tbody>
    </table>
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
        <div className="mt-3 ml-1">
          <DatePicker
            className="datePicker"
            onChange={date => {
              setStartDate(date);
              const todaySDate = Utils.getDateInFormat(date.toString());
              const { weekDateFormatted, weekDates } = Utils.getCurrentWeekByDate(
                todaySDate
              );
              setColumns(weekDateFormatted);
            }}
            selected={startDate}
            customInput={<Input />}
          />
        </div>
      </div>
      <div className="pt-5" style={{ marginTop: '6rem' }}>
        {/* <Table
          key={'book-training-session'}
          className="ml-4 book-table-session"
          scroll={{ x: 1500, y: 600 }}
          columns={bookingColumns}
          data={bookingTableData}
        /> */}
        {renderTable()}
      </div>
    </div>
  );
};

export default ScheduleTraining;
