import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { addTrainerSlot, deleteTrainerSlot, getAvailability } from './calendar.api';
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Star, X, Plus, Check } from "react-feather";
import interactionPlugin from '@fullcalendar/interaction'
import { useAppSelector } from '../../store';
import { authState } from '../auth/auth.slice';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import { Utils } from '../../../utils/utils';
import axios from 'axios';

const staticData = [
  { start: new Date('2024-01-11T10:04:00.840Z'), end: new Date('2024-01-11T11:05:00.840Z') },
  { start: new Date('2024-01-11T11:06:00.840Z'), end: new Date('2024-01-11T11:08:00.840Z') }
]

function EventModal({ modal, setModal, toggle, data, selectedModalDate, setData, options, userTimeZone, ...args }) {

  const [showSelectTimeDiv, setShowSelectTimeDiv] = useState(false)
  const [disabledHourTime, setDisabledHourTime] = useState(["00", "04", "10"])
  const [disabledMinuteTime, setDisabledMinuteTime] = useState([])

  let [selectedStartTime, setSelectedStartTime] = useState("");
  let [selectedEndTime, setSelectedEndTime] = useState("");

  const [error, setError] = useState(false);

  const addTrainerSlotAPI = async () => {

    // var date = selectedModalDate?.split("-")
    //   if ((!selectedStartTime || !selectedEndTime) || (selectedStartTime === selectedEndTime) || (new Date(selectedStartTime) < new Date(selectedEndTime))) setError(true)
    //   else {
    //     const filteredData = data.find(item => {
    //       var status = (new Date(item.start_time) <= new Date(selectedStartTime) && new Date(selectedStartTime) <= new Date(item?.end_time)) ||
    //         (new Date(item.start_time) <= new Date(selectedEndTime) && new Date(selectedEndTime) <= new Date(item?.end_time))

    //       var status2 = (new Date(selectedStartTime) <= new Date(item.start_time) && new Date(item?.end_time) >= new Date(selectedStartTime)) ||
    //         (new Date(selectedEndTime) <= new Date(item.start_time) && new Date(item?.end_time) >= new Date(selectedEndTime))

    //       return status && status2
    //     });
    //     if (filteredData?.start_time) setError(true)
    //     else {
    //       try {
    //         let res = await addTrainerSlot({ start_time: selectedStartTime, end_time: selectedEndTime })
    //         let updatedData = data
    //         data?.push(res?.data)
    //         setData([...data])
    //         setSelectedStartTime("")
    //         setSelectedEndTime("")
    //         setError(false)
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     }
    //   }
    // Check for overlap
    const overlap = () => {
      let status = false;

      if (!selectedStartTime && !selectedEndTime) {
        status = true;
        return status
      }

      selectedStartTime = moment(selectedStartTime);
      selectedEndTime = moment(selectedEndTime);
      // Check for overlap
      for (const session of data) {
        const sessionStartTime = moment(session.start_time);
        const sessionEndTime = moment(session.end_time);

        if (
          selectedStartTime?.isBetween(
            sessionStartTime,
            sessionEndTime,
            null,
            "[]"
          ) ||
          selectedEndTime?.isBetween(
            sessionStartTime,
            sessionEndTime,
            null,
            "[]"
          ) ||
          (selectedStartTime?.isSameOrBefore(sessionStartTime) && selectedEndTime?.isSameOrAfter(sessionEndTime))
        ) {
          if (selectedStartTime?.isSame(sessionEndTime) || selectedEndTime?.isSame(sessionStartTime)) {
          } else {
            status = true;
            break; // Exit the loop if overlap is detected
          }
        }
      }
      return status;
    };


    if (overlap()) {
      setError(true)
      console.log("error not booked you")
    }
    else {
      console.log("booking succeusjfuly")
      try {
        let res = await addTrainerSlot({ start_time: selectedStartTime, end_time: selectedEndTime })
        let updatedData = data
        data?.push(res?.data)
        setData([...data])
        setSelectedStartTime("")
        setSelectedEndTime("")
        setError(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deleteTrainerSlotAPI = async (id, index) => {
    try {
      let res = await deleteTrainerSlot({ _id: id })
      data.splice(index, 1)
      setData([...data])
    } catch (error) {
      console.log(error)
    }
  }


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: "10px"
  }
  const selectcontainerStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
  };

  useEffect(() => {
    let hourArr = data?.map((e) => {
      let str = moment(e?.start_time).format('h:mm a')
      let preFillhours = str?.split(" ")[0]?.split(":")[0].toString().padStart(2, 0)
      return preFillhours
    })
    setDisabledHourTime(hourArr)
  }, [data])


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalBody>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "-10px", right: "0px", background: "none" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { toggle() }} > <X /> </div>
            <div style={{ marginTop: "10px", marginBottom: "40px" }}><b>{selectedModalDate}</b></div>

            {/* <div style={{ marginBottom: "20px" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setShowSelectTimeDiv(true) }} > <Plus /> </div> */}
            <div style={containerStyle}>
              <div style={{ display: "flex", justifyContent: "flex-start", gap: "18px" }}>
                <div style={selectcontainerStyle}>
                  <select style={selectStyle} value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)}>
                    <option hidden>
                      Start  Time
                    </option>
                    {options.map((time) => (
                      <option disabled={moment(time)?.isBefore(moment(new Date().toISOString()))} key={time} value={time}>
                        {moment(time).tz(userTimeZone).format('h:mm a')}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={selectcontainerStyle}>
                  <select style={selectStyle} value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)}>
                    <option hidden>
                      End Time
                    </option>
                    {options.map((time) => (
                      <option disabled={moment(time)?.isBefore(moment(new Date().toISOString()))} key={time} value={time}>
                        {moment(time).tz(userTimeZone).format('h:mm a')}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={selectcontainerStyle}>
                  <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setShowSelectTimeDiv() }} > <X /> </div>
                </div>
                <div style={selectcontainerStyle}>
                  <div className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => addTrainerSlotAPI()} > <Plus /> </div>
                </div>
              </div>
              {error && <div> <p style={{ color: "red", margin: "3px 0px -4px 2px" }}>Please select a valid start time and end time.</p></div>}
            </div>

            {showSelectTimeDiv && <hr />}
            {
              data?.map((e, index) => {
                return <div style={containerStyle}>
                  <div style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>Start  Time</label>
                      <select style={selectStyle} value={e?.start_time}>
                        {options.map((time) => (
                          <option key={time} value={time}>
                            {moment(time).tz(userTimeZone).format('h:mm a')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>End  Time</label>
                      <select style={selectStyle} value={e?.end_time}>
                        {options.map((time) => (
                          <option key={time} value={time}>
                            {moment(time).tz(userTimeZone).format('h:mm a')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={selectcontainerStyle}>
                      <div style={{ marginTop: "20px" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { deleteTrainerSlotAPI(e?._id, index) }} > <X /> </div>
                    </div>
                    <div style={selectcontainerStyle}>
                      <div style={{ marginTop: "20px" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { console.log("click") }} > <Check /> </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default function CalendarPage() {


  const { userInfo } = useAppSelector(authState);


  const [data, setData] = useState([])
  const [availabilityData, setAvailabilityData] = useState([])
  const [selectedDateEvent, setSelectedDateEvent] = useState([])
  const [modal, setModal] = useState(false);
  const [selectedModalDate, setSelectedModalDate] = useState("")
  const [options, setOptions] = useState([])
  const [userTimeZone, setUserTimeZone] = useState("")

  useEffect(() => {
    if (userInfo?.extraInfo?.working_hours?.time_zone) {
      getIANATimeZone(userInfo?.extraInfo?.working_hours?.time_zone)
    }
  }, [userInfo?.extraInfo?.working_hours?.time_zone])

  const toggle = () => {
    setModal(!modal)
    setData([])
    getAllAvailability()
  };

  useEffect(() => {
    getAllAvailability();
  }, [])


  const getIANATimeZone = async (timezoneString) => {
    const matches = timezoneString.match(/\(GMT ([\+\-]\d+:\d+)\)/);
    const utcOffset = matches ? matches[1] : null;
    const response = await axios.get('https://fullcalendar.io/api/demo-feeds/timezones.json');
    var timeZones = response.data;
    const ianaTimeZone = utcOffset ? timeZones.find((tz) => moment.tz(tz).utcOffset() === moment.duration(utcOffset).asMinutes()) : '';
    setUserTimeZone(ianaTimeZone)
  };

  const currentDateAndtime = (startDate) => {
    // Create a new Date object for the current date
    const currentDate = new Date(startDate);

    // Get the year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date in the desired format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
  }

  const getAllAvailability = async () => {
    var res = await getAvailability()
    setAvailabilityData(res?.data)
    var newData = await extractAvailabilities(res?.data)
    setData([...newData])
  }


  function extractAvailabilities(availabilitiesList) {
    const result = [];
    availabilitiesList.forEach(availability => {
      const startTime = new Date(availability.start_time);
      const endTime = new Date(availability.end_time);
      result.push({
        start: startTime,
        end: endTime
      });
    });
    return result;
  }

  function generateTimeArray(selectedDate) {

    const start_time = moment.tz(selectedDate, userTimeZone).startOf('day');
    const end_time = moment.tz(selectedDate, userTimeZone).endOf('day');

    const timeArray = [];
    while (start_time <= end_time) {
      timeArray.push(start_time.toISOString());
      start_time.add(15, 'minutes');
    }
    setOptions([...timeArray])
  }


  // function generateTimeArray(selectedDate) {
  //   var date = new Date(selectedDate).toISOString().split("T")[0];
  //   var dateArr = date?.split("-");
  //   let start_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 0, 0, 0, 0)
  //   let end_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 23, 59, 0, 0)

  //   const timeArray = [];
  //   while (start_time <= end_time) {
  //     timeArray.push(start_time.toISOString());
  //     start_time.setMinutes(start_time.getMinutes() + 15);
  //   }
  //   setOptions([...timeArray])
  // }

  const handleSelectedModal = (date) => {
    // let find = availabilityData?.find((el) => el?._id === date)
    // var dateArr = date?.split("-");
    // let start_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 0, 0, 0, 0).toISOString()
    // let end_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 23, 59, 0, 0).toISOString()

    const start_time = moment.tz(date, userTimeZone).startOf('day');
    const end_time = moment.tz(date, userTimeZone).endOf('day');

    const filteredData = availabilityData.filter(item => {
      return new Date(start_time) <= new Date(item.start_time) && new Date(item?.start_time) <= new Date(end_time)
    });

    setSelectedDateEvent(filteredData)
    setSelectedModalDate(date)
    generateTimeArray(date)
    setModal(true);
  }


  return (
    <div className='calendar-container' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
      {data?.length && userTimeZone && <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
        headerToolbar={{ left: 'prev,next', center: 'title', right: '' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={data}
        height={600}
        width={500}
        timeZone={userTimeZone}
        dateClick={function (e) {
          var date = currentDateAndtime(e?.date)
          handleSelectedModal(date)
        }}
        eventContent={(e) => {
          return (
            <>
              {/* <button style={{
                borderRadius: "50px",
                width: "20px",
                height: "20px",
                backgroundColor: "blue",
                color: "#fff",
                border: "0px",
                fontSize: "large",
                textAlign: "cente"
              }} onClick={() => {
                var date = currentDateAndtime(e?.event?.start)
                handleSelectedModal(date)
              }}>+</button> */}
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px 10px", textAlign: "center" }}>
                <div >
                  <b>{moment(e.event.start).tz(userTimeZone).format('h:mm a')} - {moment(e.event.end).tz(userTimeZone).format('h:mm a')}</b>
                </div>
              </div>
            </>
          )
        }}
      />}
      {!data?.length && <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{ left: 'prev,next', center: 'title', right: '' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[]}
        height={410}
        dateClick={function (e) {
          var date = currentDateAndtime(e?.date)
          handleSelectedModal(date)
        }}
        eventContent={(e) => {
          return (
            <>
              {/* <button>+ Add New</button> */}
              <div onClick={() => { }} style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px 10px", textAlign: "center", background: "red" }}>
                <div >
                  <b>{moment(e.event.start).format('h:mm a')} - {moment(e.event.end).format('h:mm a')}</b>
                </div>
              </div>
            </>
          )
        }}
      />}
      <EventModal modal={modal} setModal={setModal} toggle={toggle} setData={setAvailabilityData} data={selectedDateEvent} selectedModalDate={selectedModalDate} options={options} userTimeZone={userTimeZone} />
    </div>
  )
}
