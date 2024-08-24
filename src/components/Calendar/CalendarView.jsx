import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Notification } from "../Shared";

import { Event } from "../../database/api";
import { transformRawEvents, transformEventsToTasks } from "../../utils/utils";
import DataContext from "../../context/data";
import AuthContext from "../../context/loginStatus";
import { EventContext } from "../../context/data";

import FrontPage from "./FrontPage";
import { Header } from "../Shared"; //Test
import { EventAdder } from "../Events";

import "./CalendarView.css";
import "../../styles/HamStyle.css";
import StylingContext from "../../context/styling";
import { useNavigate } from "react-router-dom";

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
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [notification, _setNotification] = useState();
  const { setData } = useContext(DataContext);
  const { events, setEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { colorcode } = useContext(StylingContext);

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: colorcode[event.tag],
      borderRadius: "5px",
      opacity: 0.8,
      display: "block",
    };
    return { style };
  };

  const setNotification = (notification) => {
    _setNotification(notification);
    setTimeout(() => {
      _setNotification(null);
    }, 3000);
  };

  const [newEvent, setNewEvent] = useState({
    title: "",
    tag: "",
    start_time: "",
    end_time: "",
    description: "",
    recurrence: "never",
    uid: user.uid,
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
    const start_d = new Date(start);
    const end_d = new Date(end);

    setNewEvent({
      ...newEvent,
      start_time: start_d.toISOString().slice(0, 16),
      end_time: end_d.toISOString().slice(0, 16),
      uid: user.uid,
    });
    setModalIsOpen(true);
  };

  const handleAddEvent = async (e) => {
    if (!user.success) {
      setNotification({
        message: "Please Signin to Add Tasks",
        type: "error",
      });
      setModalIsOpen(false);
      return;
    }

    const ev = new Event(newEvent);
    const eventId = await ev.save();
    if (eventId) {
      setNotification({
        message: "Event saved successfully",
        type: "success",
      });
      setModalIsOpen(false);

      const updatedEvents = [...events, { ...newEvent }];
      setEvents(updatedEvents);
      setData(transformEventsToTasks(updatedEvents));
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
          events={transformRawEvents(events)}
          selectable
          onSelectSlot={handleSelectSlot}
          components={{
            timeGutterHeader: CustomTimeHeader,
            header: CustomTimeHeader,
          }}
          eventPropGetter={eventPropGetter}
          onSelectEvent={(event) => {
            navigate(`/events/${event.ref}`);
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
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default CalendarView;
