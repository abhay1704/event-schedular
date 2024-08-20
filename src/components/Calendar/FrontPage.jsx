import { useContext, useState } from "react";
import "./FrontPage.css";
import { Piechart, Presentation } from "../Shared";
import { TaskCard, DetailedTask } from "../Tasks";
import DataContext from "../../context/data";
import StylingContext from "../../context/styling";

const chartData = {
  inputData: [10, 20, 30, 25, 15], // Example data
  backgroundColor: [
    "rgba(74, 144, 226, 0.7)", // Work (light blue)
    "rgba(245, 166, 35, 0.7)", // Personal (light orange)
    "rgba(248, 231, 28, 0.7)", // Learning (light yellow)
    "rgba(126, 211, 33, 0.7)", // Health (light green)
    "rgba(189, 16, 224, 0.7)", // Social (light purple)
  ],
};

const FrontPage = ({ className }) => {
  const { data: tasks } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState(
    tasks && tasks.length > 0 ? tasks[0] : null
  );

  const [active, setActive] = useState(0);

  const handleTask = (e) => {
    const target = e.target.closest("li");
    if (!target) return;
    const taskIndex = parseInt(target.dataset.index);
    setCurrentTask(tasks[taskIndex]);
    setActive(taskIndex);
  };

  return (
    <section id="front-page" className={className}>
      <h1 className="greet-msg">
        Good Morning <span className="front-page__username">BSDK!</span>
      </h1>

      <div className="front-page__content">
        <div className="front-page__left">
          <Presentation />
          <div className="tasks">
            <div className="tasks__listing">
              <h2>Tasks</h2>
              <ul className="tasks__list--today" onClick={handleTask}>
                {tasks && tasks.length > 0
                  ? tasks.map((task, index) =>
                      TaskCard({
                        currentTask: task,
                        key: index,
                        "data-index": index,
                        active: index === active,
                      })
                    )
                  : "No tasks for today"}
              </ul>
            </div>
            {currentTask && <DetailedTask {...{ currentTask }} />}
          </div>
          <div style={{ width: "100%", height: "300px" }}>
            <Piechart {...chartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPage;
