import TaskList from "./TaskList";
import "./TaskOverview.css";
import { getUserEvents } from "../../database/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/loginStatus";
import { transformEventsToTasks } from "../../utils/utils.js";
import DataContext from "../../context/data";

const TaskOverview = () => {
  const [tasks, setTasks] = useState();
  const { setData } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      alert("Pls Login to Add/View Tasks");
      return;
    }
    getUserEvents(user.uid).then((events) => {
      const tasks = transformEventsToTasks(events);
      setTasks(tasks);
      setData(tasks);
      console.log(tasks);
    });
  }, [user, setData]);

  return (
    <section id="tasks-overview">
      <ul className="task--lists">
        {tasks &&
          Array.from({ length: 7 }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const formattedDate = date.toISOString().split("T")[0];
            const task = tasks[formattedDate];

            return task ? (
              <TaskList key={index} date={date} tasks={task} />
            ) : (
              <li key={index}>No tasks for {formattedDate}</li>
            );
          })}
      </ul>
    </section>
  );
};

export default TaskOverview;
