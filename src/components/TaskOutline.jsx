import MyCalendar from "./MyCalendar";
import TasksOverview from "./TaskOverview";
import "./TaskOutline.css";

const TaskOutline = ({className}) => {
  return (
    <section id="task-outline" className={className}>
      <MyCalendar />
      <TasksOverview />
    </section>
  );
};

export default TaskOutline;
