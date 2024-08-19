import "./TaskList.css";

const TaskList = ({ date, tasks }) => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  today.setDate(today.getDate() + 1);

  const isTommorow = date.toDateString() === today.toDateString();

  const stringDate = date.toLocaleString("en-IN", {
    day: "numeric",
    month: "numeric",
  });

  // document.write(JSON.stringify(tasks));

  const week = date.toDateString().split(" ")[0];

  return (
    <li className={"task--list" + isToday ? " today" : ""}>
      <h2 className="task-list--heading">
        {isToday ? "Today" : isTommorow ? "Tommorow" : week} {stringDate}{" "}
      </h2>
      <ul className="tasks">
        {tasks &&
          tasks.map(
            ({ start_time, end_time, tag, name, description }, index) => {
              let start = new Date(start_time);
              let end = new Date(end_time);
              start = start.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
              end = end.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
              return (
                <li key={index} className={"task " + tag.toLowerCase() + "-tag"}>
                  <div className="task--content">
                    <div className="task--time">
                      <span>{start}</span> - <span>{end}</span>
                    </div>
                    <div className="task--details">
                      <h3>{name}</h3>
                    </div>
                  </div>
                </li>
              );
            }
          )}
      </ul>
    </li>
  );
};

export default TaskList;
