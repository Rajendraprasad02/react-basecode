import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function EventCalander() {
  const [eventsData, setEventsData] = useState([
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2024, 7, 1),
      end: new Date(2024, 7, 1),
    },
  ]);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <Calendar
      views={["day", "agenda", "work_week", "month"]}
      selectable
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      events={eventsData}
      style={{ height: "100vh" }}
      onSelectEvent={(event) => alert(event.title)}
      onSelectSlot={handleSelect}
    />
  );
}
