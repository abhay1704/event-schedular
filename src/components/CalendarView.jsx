import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import "./CalendarView.css";
import FrontPage from "./FrontPage";
import "./HamStyle.css";

const localizer = momentLocalizer(moment);

const CustomTimeHeader = ({ label }) => {
  if (!label) return "";
  const labelArray = label.split(" ");
  return (
    <>
      {labelArray.map((word, index) => (
        <span key={index} className="child">
          {word}
        </span>
      ))}
    </>
  );
};

const CalendarView = ({ className, isTaskOutlineOpen, toggleTaskOutline }) => {
  const [showCustomDayView, setShowCustomDayView] = useState(false);

  useEffect(() => {
    if (showCustomDayView) return;
    // Hide the "Today" button and change the text of the "Previous" and "Next" buttons
    const buttonGroups = document.querySelector(
      "#calendar-view .rbc-btn-group"
    );
    const buttons = buttonGroups.querySelectorAll("button");
    buttons[0].style.display = "none";
    buttons[1].innerHTML = "❮";
    buttons[2].innerHTML = "❯";
  }, [showCustomDayView]);

  // State to toggle between the calendar and the custom day view

  const handleToggleView = () => {
    setShowCustomDayView((prev) => !prev);
  };

  return (
    <section id="calendar-view" className={className}>
      <div className="rbc-view--change">
        <button
          id="open-task-outline-btn"
          className={isTaskOutlineOpen ? "task-view--open" : ""}
          onClick={toggleTaskOutline}
        >
          <span className="ham" aria-hidden></span>
        </button>
        <button
          onClick={handleToggleView}
          style={{
            display: "inline-block",
            marginLeft: "auto",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "var(--md-sys-color-secondary)",
            color: "var(--md-sys-color-on-secondary)",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            textAlign: "right",
          }}
        >
          {showCustomDayView ? "Back to Calendar" : "Today's Agenda"}
        </button>
      </div>
      {showCustomDayView ? (
        <FrontPage className="light" />
      ) : (
        <Calendar
          views={{ week: true, month: true, day: true }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          components={{
            timeGutterHeader: CustomTimeHeader, // Customize the time gutter header
            header: CustomTimeHeader, // Customize the day header
          }}
        />
      )}
    </section>
  );
};

export default CalendarView;
