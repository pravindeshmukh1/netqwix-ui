import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAvailability } from './calendar.api';

const staticData = [
  { start: new Date('2024-01-11T10:04:00.840Z'), end: new Date('2024-01-11T11:05:00.840Z') },
  { start: new Date('2024-01-11T11:06:00.840Z'), end: new Date('2024-01-11T11:08:00.840Z') }
]

export default function CalendarPage() {

  const [data, setData] = useState([])


  useEffect(() => {
    getAllAvailability();
  }, [])

  const getAllAvailability = async () => {
    var res = await getAvailability()
    var newData = await extractAvailabilities(res?.data)
    setData([...newData])
  }

  console.log("data", data);

  function extractAvailabilities(availabilitiesList) {
    const result = [];
    availabilitiesList.forEach(day => {
      day.availabilities.forEach(availability => {
        const startTime = new Date(availability.start_time);
        const endTime = new Date(availability.end_time);
        result.push({
          start: startTime,
          end: endTime
        });
      });
    });
    return result;
  }


  const getData = (e) => {
    console.log(e.start);
    console.log(e.end);
  }

  return (
    <div className='calendar-container'>
      {data?.length && <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{ left: 'prev,next', center: 'title', right: '' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={data}
        datesSet={(e) => getData(e)}
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
    </div>
  )
}
