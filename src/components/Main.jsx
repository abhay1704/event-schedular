import { Outline } from "./Tasks";
import { CalendarView } from "./Calendar";
import { useState } from "react";

const Main = () => {
  const [isTaskOutlineOpen, setTaskOutlineOpen] = useState(false);

  const toggleTaskOutline = () => {
    setTaskOutlineOpen((prev) => !prev);
  };

  return (
    <main className="App light">
      <Outline className={`dark ${isTaskOutlineOpen ? "open" : ""}`} />
      <CalendarView {...{ isTaskOutlineOpen, toggleTaskOutline }} />
    </main>
  );
};

export default Main;
