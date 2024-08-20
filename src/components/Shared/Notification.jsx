import { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type = "general", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Automatically hide the notification after the specified duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [duration]);

  if (!visible) return null;

  // ClassName based on the type of notification
  const notificationClass = `notification ${type}`;

  return (
    <div className={notificationClass}>
      <p>{message}</p>
      <button onClick={() => setVisible(false)} className="close-btn">
        &times;
      </button>
    </div>
  );
};

export default Notification;
