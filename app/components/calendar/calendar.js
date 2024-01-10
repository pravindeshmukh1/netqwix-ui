import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function CalendarPage() {
  return (
    <div className='calendar-container'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'dayGridMonth',
        }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[
          { title: 'nice event', start: new Date(), resourceId: 'a' },
          { title: 'nice event', start: new Date("2024/01/23"), resourceId: 'a' },
          { title: 'nice event', start: new Date("2024/01/23"), resourceId: 'a' },
        ]}
        eventContent={(e) => {
          return (
            <div onClick={() => { }} style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px 10px", textAlign: "center" }}>
              <div >
                <b>10:00 PM - 11:00 PM</b>
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
