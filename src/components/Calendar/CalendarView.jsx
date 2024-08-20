import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useContext, useEffect, useState } from "react";

import { Event } from "../../database/api";
import { transformEventsToTasks } from "../../utils/utils";
import DataContext from "../../context/data";

import FrontPage from "./FrontPage";
import { Header } from "../Shared";  //Test
import {EventAdder} from "../Events";

import "./CalendarView.css";
import "../../styles/HamStyle.css";

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
  const [events, setEvents] = useState([]); // State to hold the events
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const { setData } = useContext(DataContext);
  const [newEvent, setNewEvent] = useState({
    name: "",
    tag: "",
    start: "",
    end: "",
    description: "",
  }); // State to hold new event details

  useEffect(() => {
    if (showCustomDayView) return;
    // Hide the "Today" button and change the text of the "Previous" and "Next" buttons
    const buttonGroups = document.querySelector(
      "#calendar-view .rbc-btn-group"
    );
    const buttons = buttonGroups.querySelectorAll("button");
    if (buttons.length > 0) {
      buttons[0].style.display = "none";
      buttons[1].innerHTML = "❮";
      buttons[2].innerHTML = "❯";
    }
  }, [showCustomDayView]);

  const handleToggleView = () => {
    setShowCustomDayView((prev) => !prev);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setModalIsOpen(true); // Open modal to input event details
  };

  const handleAddEvent = async (title, description, date, time, user) => {
    if (!user || !user.uid) {
      console.error("User is not authenticated");
      setModalIsOpen(false);
      return;
    }

    const newEvent = new Event(title, description, date, time, user.uid);

    const eventId = await newEvent.save();
    setModalIsOpen(false);

    if (eventId) {
      console.log("Event saved with ID:", eventId);
      setData((prev) => {
        transformEventsToTasks([...events, newEvent]);
      });
      // Update your state or UI with the new event if needed
    } else {
      console.error("Failed to save event");
    }
  };

  return (
    <section id="calendar-view" className={className}>
      <Header
        {...{
          isTaskOutlineOpen,
          toggleTaskOutline,
          handleToggleView,
          showCustomDayView,
        }}
      />
      {showCustomDayView ? (
        <FrontPage className="light" />
      ) : (
        <Calendar
          views={{ week: true, month: true, day: true }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={events} // Pass the events state to the Calendar component
          selectable
          onSelectSlot={handleSelectSlot} // Handle slot selection for adding events
          components={{
            timeGutterHeader: CustomTimeHeader, // Customize the time gutter header
            header: CustomTimeHeader, // Customize the day header
          }}
        />
      )}

      <EventAdder
        {...{
          handleAddEvent,
          newEvent,
          setNewEvent,
          modalIsOpen,
          setModalIsOpen,
        }}
      />
    </section>
  );
};

export default CalendarView;
