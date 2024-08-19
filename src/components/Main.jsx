import TaskOutline from "./TaskOutline";
import CalendarView from "./CalendarView";
import { useState } from "react";

const Main = () => {
  const [isTaskOutlineOpen, setTaskOutlineOpen] = useState(false);

  const toggleTaskOutline = () => {
    setTaskOutlineOpen((prev) => !prev);
  };

  return (
    <main className="App light">
      <TaskOutline className={`dark ${isTaskOutlineOpen ? "open" : ""}`} />
      <CalendarView {...{ isTaskOutlineOpen, toggleTaskOutline }} />
    </main>
  );
};

export default Main;
