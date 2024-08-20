import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../database/api";
import "./EventDetail.css";
import { downloadICS, shareEvent } from "../../utils/utils";

const EventDetail = () => {
  const { id } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null); // State to hold event details
  const [loading, setLoading] = useState(true); // State to handle loading
  const timeOption = { hour: "2-digit", minute: "2-digit" };

  useEffect(() => {
    // Fetch the event details when the component mounts
    const fetchEvent = async () => {
      try {
        const fetchedEvent = await getEvent(id); // Call the API to get event details
        console.log(fetchedEvent);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchEvent();
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
    <div className="wrapper light">
      <div className="event-detail__container">
        <div className="event-detail__header">
          <h1 className="event-detail__title">{event.title}</h1>
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
              {new Date(event.end_time).toLocaleTimeString("en-IN", timeOption)}
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
    </div>
  );
};

export default EventDetail;
