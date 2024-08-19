import React, { useState } from "react"; // Import useState from react package
import "./App.css";
// import MyCalendar from "./components/MyCalendar";
import TaskOutline from "./components/TaskOutline";
import CalendarView from "./components/CalendarView";
import "./material-theme/css/light.css";
import "./material-theme/css/dark.css";

function App() {
  const [isTaskOutlineOpen, setTaskOutlineOpen] = useState(false);

  const toggleTaskOutline = () => {
    setTaskOutlineOpen((prev) => !prev);
  };

  return (
    <main className="App light">
      
      <TaskOutline className={`dark ${isTaskOutlineOpen ? "open" : ""}`} />
      <CalendarView {...{isTaskOutlineOpen, toggleTaskOutline}} />
    </main>
  );
}

export default App;
