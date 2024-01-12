import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { addTrainerSlot, deleteTrainerSlot, getAvailability } from './calendar.api';
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Star, X, Plus, Check } from "react-feather";
import interactionPlugin from '@fullcalendar/interaction'

const staticData = [
  { start: new Date('2024-01-11T10:04:00.840Z'), end: new Date('2024-01-11T11:05:00.840Z') },
  { start: new Date('2024-01-11T11:06:00.840Z'), end: new Date('2024-01-11T11:08:00.840Z') }
]

function EventModal({ modal, setModal, toggle, data, selectedModalDate, setData, ...args }) {
  const [showSelectTimeDiv, setShowSelectTimeDiv] = useState(false)
  const [disabledHourTime, setDisabledHourTime] = useState(["00", "04", "10"])
  const [disabledMinuteTime, setDisabledMinuteTime] = useState([])

  const [selectedStartHour, setSelectedStartHour] = useState("");
  const [selectedStartMinute, setSelectedStartMinute] = useState("");

  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [selectedEndMinute, setSelectedEndMinute] = useState("");
  const [error, setError] = useState(false);

  const addTrainerSlotAPI = async () => {
    var date = selectedModalDate?.split("-")
    if ((!selectedStartHour || !selectedStartMinute || !selectedEndHour || !selectedEndMinute)) setError(true)
    else {
      let start_time = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(selectedStartHour), Number(selectedStartMinute), 0, 0).toISOString()
      let end_time = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(selectedEndHour), Number(selectedEndMinute), 0, 0).toISOString()
      try {
        let res = await addTrainerSlot({ start_time, end_time })
        let updatedData = data
        data?.push(res?.data)
        setData([...data])
        setSelectedStartHour("")
        setSelectedStartMinute("")
        setSelectedEndHour("")
        setSelectedEndMinute("")
        setError(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deleteTrainerSlotAPI = async (id, index) => {
    try {
      let res = await deleteTrainerSlot({ _id: id })
      data.splice(1, 1)
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
                  <label style={labelStyle}>Hour:</label>
                  <select style={selectStyle} value={selectedStartHour} onChange={(e) => setSelectedStartHour(e.target.value)}>
                    <option hidden>
                      HH
                    </option>
                    {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
                      <option disabled={disabledHourTime?.find((el) => el === hour) ? true : false} key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={selectcontainerStyle}>
                  <label style={labelStyle}>Minute:</label>
                  <select style={selectStyle} value={selectedStartMinute} onChange={(e) => setSelectedStartMinute(e.target.value)}>
                    <option hidden >
                      MM
                    </option>
                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                      <option disabled={disabledMinuteTime?.find((el) => el === minute) ? true : false} key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ---------------------- */}
                <p>To</p>
                {/* ----------------------------- */}
                <div style={selectcontainerStyle}>
                  <label style={labelStyle}>Hour:</label>
                  <select style={selectStyle} value={selectedEndHour} onChange={(e) => setSelectedEndHour(e.target.value)}>
                    <option hidden>
                      HH
                    </option>
                    {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
                      <option disabled={disabledHourTime?.find((el) => el === hour) ? true : false} key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={selectcontainerStyle}>
                  <label style={labelStyle}>Minute:</label>
                  <select style={selectStyle} value={selectedEndMinute} onChange={(e) => setSelectedEndMinute(e.target.value)}>
                    <option hidden>
                      MM
                    </option>
                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                      <option disabled={disabledMinuteTime?.find((el) => el === minute) ? true : false} key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={selectcontainerStyle}>
                  <div style={{ marginTop: "20px" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => { setShowSelectTimeDiv() }} > <X /> </div>
                </div>
                <div style={selectcontainerStyle}>
                  <div style={{ marginTop: "20px" }} className="icon-btn btn-sm btn-outline-light close-apps pointer" onClick={() => addTrainerSlotAPI()} > <Plus /> </div>
                </div>
              </div>
              {error && <div> <p style={{ color: "red", margin: "3px 0px -4px 2px" }}>Please select a valid start time and end time.</p></div>}
            </div>

            {showSelectTimeDiv && <hr />}
            {
              data?.map((e, index) => {
                let startTime = moment(e?.start_time).format('h:mm a')
                let preFillhoursStart = startTime?.split(" ")[0]?.split(":")[0].toString().padStart(2, 0)
                let preFillminutesStart = startTime.split(" ")[0]?.split(":")[1].toString().padStart(2, 0)

                let endTime = moment(e?.end_time).format('h:mm a')
                let preFillhoursEnd = endTime?.split(" ")[0]?.split(":")[0].toString().padStart(2, 0)
                let preFillminutesEnd = endTime.split(" ")[0]?.split(":")[1].toString().padStart(2, 0)
                return <div style={containerStyle}>
                  <div style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>Hour:</label>
                      <select style={selectStyle} value={preFillhoursStart}>
                        {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>Minute:</label>
                      <select style={selectStyle} value={preFillminutesStart}>
                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p>To</p>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>Hour:</label>
                      <select style={selectStyle} value={preFillhoursEnd}>
                        {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={selectcontainerStyle}>
                      <label style={labelStyle}>Minute:</label>
                      <select style={selectStyle} value={preFillminutesEnd}>
                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
                          <option key={minute} value={minute}>
                            {minute}
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

  const [data, setData] = useState([])
  const [availabilityData, setAvailabilityData] = useState([])
  const [selectedDateEvent, setSelectedDateEvent] = useState([])
  const [modal, setModal] = useState(false);
  const [selectedModalDate, setSelectedModalDate] = useState("")

  const toggle = () => {
    setModal(!modal)
    setData([])
    getAllAvailability()
  };


  useEffect(() => {
    getAllAvailability();
  }, [])

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

  const handleSelectedModal = (date) => {
    // let find = availabilityData?.find((el) => el?._id === date)
    var dateArr = date?.split("-");
    let start_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 0, 0, 0, 0).toISOString()
    let end_time = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]), 23, 59, 0, 0).toISOString()

    const filteredData = availabilityData.filter(item => {
      return new Date(start_time) <= new Date(item.start_time) && new Date(item?.start_time) <= new Date(end_time)
    });

    setSelectedDateEvent(filteredData)
    setSelectedModalDate(date)
    setModal(true);
  }


  const getData = (e) => {
    console.log(e.start);
    console.log(e.end);
  }

  return (
    <div className='calendar-container' >
      {data?.length && <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{ left: 'prev,next', center: 'title', right: '' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={data}
        dateClick={function (e) {
          var date = currentDateAndtime(e?.date)
          handleSelectedModal(date)
        }}
        datesSet={(e) => getData(e)}
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
                  <b>{moment(e.event.start).format('h:mm a')} - {moment(e.event.end).format('h:mm a')}</b>
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
        datesSet={(e) => getData(e)}
        dateClick={function (e) {
          var date = currentDateAndtime(e?.date)
          handleSelectedModal(date)
        }}
        eventContent={(e) => {
          return (
            <>
              {/* <button>+ Add New</button> */}
              <div onClick={() => { }} style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px 10px", textAlign: "center" }}>
                <div >
                  <b>{moment(e.event.start).format('h:mm a')} - {moment(e.event.end).format('h:mm a')}</b>
                </div>
              </div>
            </>
          )
        }}
      />}
      <EventModal modal={modal} setModal={setModal} toggle={toggle} setData={setAvailabilityData} data={selectedDateEvent} selectedModalDate={selectedModalDate} />
    </div>
  )
}
