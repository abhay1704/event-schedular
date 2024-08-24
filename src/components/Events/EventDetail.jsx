import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEvent, updateEvent } from "../../database/api";
import "./EventDetail.css";
import { downloadICS, shareEvent } from "../../utils/utils";
import AuthContext from "../../context/loginStatus";
import EventUpdate from "./EventUpdate";
import { Notification } from "../Shared";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../database/api";
import { ConfirmModal } from "../Shared";

const EventDetail = () => {
  const { id } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null); // State to hold event details
  const [loading, setLoading] = useState(true); // State to handle loading
  const timeOption = { hour: "2-digit", minute: "2-digit" };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [newEvent, setNewEvent] = useState({});
  const [notification, _setNotification] = useState(null);
  const [confirmModalIsOpen, setConfimModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const setNotification = (notification) => {
    _setNotification(notification);
    setTimeout(() => {
      _setNotification(null);
    }, notification.duration || 5000);
  };

  const handleEdit = () => {
    console.log(user);
    if (!user.success) {
      setNotification(
        {
          message: "Please Login to update Event",
          type: "error",
        },
        3000
      );
      return;
    }
    setModalIsOpen(true);
    setNewEvent({
      ...event,
      start_time: event.start_time.toISOString().slice(0, 16),
      end_time: event.end_time.toISOString().slice(0, 16),
    });
  };

  const handleUpdateEvent = async () => {
    const ref = event.ref;
    const status = await updateEvent(ref, {
      ...newEvent,
      start_time: new Date(newEvent.start_time),
      end_time: new Date(newEvent.end_time),
    });
    if (status) {
      setNotification({
        message: "Event updated successfully",
        type: "success",
      });
    } else {
      setNotification({
        message: "Failed to update event",
        type: "error",
      });
    }
    setModalIsOpen(false);
  };

  const handleDeleteEvent = () => {
    const status = deleteEvent(id, user.uid);
    if (status) {
      setNotification({
        message: "Event deleted successfully",
        type: "success",
      });
    } else {
      setNotification({
        message: "Failed to Delete event",
        type: "error",
      });
    }
    setConfimModalIsOpen(false);
  };

  const handleCancelUpdate = () => {
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    if (!user.success || user.uid !== event.uid) {
      setNotification({
        message: "Please Login to Delete Event",
        type: "error",
      });
      return;
    }

    // Confirm deletion
    setConfimModalIsOpen(true);
    // delete
  };
  useEffect(() => {
    // Fetch the event details when the component mounts
    let unsubscribe;
    try {
      setLoading(true); // Start loading
      if (!id) {
        setEvent(null);
      }

      const docRef = doc(db, "events-xx1", id);
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        console.log("update", snapshot.exists());
        if (snapshot.exists() && snapshot.data()) {
          const currEvent = snapshot.data();
          currEvent.ref = id;
          currEvent.start_time = currEvent.start_time.toDate();
          currEvent.end_time = currEvent.end_time.toDate();
          setEvent(currEvent);
          setLoading(false); // Stop loading after fetching
        } else {
          setEvent(null);
          setLoading(false); // Stop loading after fetching
        }
      });
      console.log("Document data: ", event);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setLoading(false); // Stop loading after fetching
    }

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe from the event details
      }
    };
  }, [id]);

  if (loading) {
    return (
      <div className="wrapper light">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="wrapper light">
        <div className="event-detail__error">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="event--page light">
      <div className="header">
        <button
          onClick={() => {
            navigate("/");
          }}
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
          Back to Calendar
        </button>
      </div>
      <div className="wrapper">
        <div className="event-detail__container">
          <div className="event-detail__header">
            <h1 className="event-detail__title">
              {event.title}{" "}
              <div className="icon-btn-group">
                <span className="event-edit--icon" onClick={handleEdit}>
                  <img src="/edit-icon.svg" alt="edit-icon" />
                </span>
                <span className="event-delete--icon" onClick={handleDelete}>
                  <img src="/delete-icon.svg" alt="edit-icon" />
                </span>
              </div>
            </h1>
            <p className="event-detail__date">
              {new Date(event.start_time).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="event-detail__body">
            <p className="event-detail__description">{event.description}</p>
            <div className="event-detail__info">
              <div className="event-detail__info-item">
                <strong>Location:</strong> {event.location}
              </div>
              <div className="event-detail__info-item">
                <strong>Start Time:</strong>{" "}
                {new Date(event.start_time).toLocaleTimeString(
                  "en-IN",
                  timeOption
                )}
              </div>
              <div className="event-detail__info-item">
                <strong>End Time:</strong>{" "}
                {new Date(event.end_time).toLocaleTimeString(
                  "en-IN",
                  timeOption
                )}
              </div>
            </div>
          </div>
          <div className="event-detail__footer">
            <button
              className="event-detail__button"
              onClick={() => downloadICS(event)}
            >
              Add to Calendar
            </button>
            <button
              className="event-detail__button"
              onClick={() => shareEvent(event)}
            >
              Share Event
            </button>
          </div>
        </div>
        <EventUpdate
          {...{
            modalIsOpen,
            setModalIsOpen,
            newEvent,
            setNewEvent,
            handleUpdateEvent,
            handleCancelUpdate,
          }}
        />
        <ConfirmModal
          {...{
            confirmModalIsOpen,
            setConfimModalIsOpen,
            onConfirmed: handleDeleteEvent,
          }}
        />
        {notification && <Notification {...notification} />}
      </div>
    </div>
  );
};

export default EventDetail;
