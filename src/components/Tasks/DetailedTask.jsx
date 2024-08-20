import React from "react";
import TaskCard from "./TaskCard";

const DetailedTask = ({ currentTask, colorcode }) => {
  return (
    <div className="tasks__details--current">
      {TaskCard({
        currentTask,
        colorcode,
      })}
      <div className="description">{currentTask.description}</div>
    </div>
  );
};

export default DetailedTask;
