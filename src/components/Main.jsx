import { Outline } from "./Tasks";
import { CalendarView } from "./Calendar";
import { useContext, useEffect, useState } from "react";
import { Notification } from "./Shared";
import AuthContext from "../context/loginStatus";

const Main = () => {
  const [isTaskOutlineOpen, setTaskOutlineOpen] = useState(false);
  const [notification, setNotification] = useState();
  const { user } = useContext(AuthContext);

  const toggleTaskOutline = () => {
    setTaskOutlineOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user.success) {
      setNotification({
        message: `Signed in Success !! Welcome, ${user.name || user.email}`,
        type: "success",
      });
      return;
    }
  }, [user]);

  return (
    <main className="App light">
      <Outline className={`dark ${isTaskOutlineOpen ? "open" : ""}`} />
      <CalendarView {...{ isTaskOutlineOpen, toggleTaskOutline }} />
      {notification && <Notification {...notification} />}
    </main>
  );
};

export default Main;
