import "./TaskCard.css";

const getTime = (string_date) => {
  const time = new Date(string_date);
  const time_string = time.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return time_string;
};

const TaskCard = ({ currentTask, colorcode, key, active, ...props }) => {
  return (
    <li
      data-text={currentTask.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")}
      style={{
        "--data-color": colorcode[currentTask.tag.toLowerCase()],
        "--data-text": currentTask.name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join(""),
      }}
      className={`tasks__item${active ? " tasks__item--active" : ""}`}
      key={key}
      {...props}
    >
      <div className="tasks__item-content" data-color="">
        <div
          className={
            "tasks__time " + currentTask.tag.toLowerCase() + "-tag--bg"
          }
        >
          <span>{getTime(currentTask.start_time)}</span>
        </div>
        <div className="tasks__details">
          <h3>{currentTask.name}</h3>
          <p className={currentTask.tag.toLowerCase() + "-tag--color tag"}>
            {currentTask.tag.toLowerCase()}
          </p>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
