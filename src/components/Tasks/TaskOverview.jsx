import TaskList from "./TaskList";
import "./TaskOverview.css";
import { getUserEvents } from "../../database/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/loginStatus";
import { transformEventsToTasks } from "../../utils/utils.js";
import DataContext, { EventContext } from "../../context/data";
import { Notification } from "../Shared";

const TaskOverview = () => {
  const [tasks, setTasks] = useState();
  const { setData } = useContext(DataContext);
  const { setEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (!user.success) {
      setNotification({ message: "Please Signin to Add or View Tasks" });
      return;
    }
    getUserEvents(user).then((events) => {
      setEvents(events);
      const tasks = transformEventsToTasks(events);
      setTasks(tasks);
      setData(tasks);
    });
  }, [user, setData, setEvents]);

  return (
    <section id="tasks-overview">
      <ul className="task--lists">
        {tasks &&
          Array.from({ length: 7 }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const formattedDate = date.toLocaleDateString("en-IN");
            const task = tasks[formattedDate];

            return task ? (
              <TaskList key={index} date={date} tasks={task} />
            ) : (
              <li key={index}>No tasks for {formattedDate}</li>
            );
          })}
      </ul>
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default TaskOverview;
