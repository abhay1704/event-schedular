import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import "./CalendarView.css";
import FrontPage from "./FrontPage";
import "./HamStyle.css";
import Modal from "react-modal"; // Import the modal component
import { Event } from "../database/api";
import { transformEventsToTasks } from "../utils";
import DataContext from "../context/data";
import AuthContext from "../context/loginStatus";

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
  const { user } = useContext(AuthContext);
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
      <div className="rbc-view--change">
        {window.innerWidth < 768 && (
          <button
            id="open-task-outline-btn"
            className={isTaskOutlineOpen ? "task-view--open" : ""}
            onClick={toggleTaskOutline}
          >
            <span className="ham" aria-hidden></span>
          </button>
        )}
        {!user && (
          <button>
            <a
              href="/signIn"
              style={{
                color: "var(--md-sys-color-on-primary)",
                height: "fit-content",
                marginTop: "0",
              }}
            >
              Sign In
            </a>
          </button>
        )}
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
          events={events} // Pass the events state to the Calendar component
          selectable
          onSelectSlot={handleSelectSlot} // Handle slot selection for adding events
          components={{
            timeGutterHeader: CustomTimeHeader, // Customize the time gutter header
            header: CustomTimeHeader, // Customize the day header
          }}
        />
      )}

      {/* Event Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{ zIndex: 2000 }}
      >
        <h2>Add New Event</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
          </label>
          <label>
            Tag:
            <input
              type="text"
              value={newEvent.tag}
              onChange={(e) =>
                setNewEvent({ ...newEvent, tag: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
          </label>
          <button type="button" onClick={handleAddEvent}>
            Add Event
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default CalendarView;
