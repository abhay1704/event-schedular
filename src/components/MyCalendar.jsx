import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";
import "./CalendarCommonStyle.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  // const [events, setEvents] = useState([
  //   {
  //     title: "Meeting",
  //     start: new Date(2024, 7, 16, 10, 0), // August 16, 2024, 10:00 AM
  //     end: new Date(2024, 7, 16, 12, 0), // August 16, 2024, 12:00 PM
  //   },
  //   {
  //     title: "Lunch",
  //     start: new Date(2024, 7, 17, 12, 0), // August 17, 2024, 12:00 PM
  //     end: new Date(2024, 7, 17, 13, 0), // August 17, 2024, 1:00 PM
  //   },
  // ]);

  useEffect(() => {
    const buttons = document.querySelectorAll(".rbc-btn-group> button");
    buttons[0].style.display = "none";
    buttons[1].innerHTML = "❮";
    buttons[2].innerHTML = "❯";
  }, []);

  return (
    <section className="calendar">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
      />
    </section>
  );
};

export default MyCalendar;
