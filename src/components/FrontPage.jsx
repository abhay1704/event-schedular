import { useContext, useEffect, useState } from "react";
import "./FrontPage.css";
import PieChart from "./PieChart";
import TaskCard from "./TaskCard";
import DataContext from "../context/data";

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

const colorcode = {
  work: "#4a90e2",
  personal: "#f5a623",
  urgent: "#d0021b",
  health: "#7ed321",
  social: "#bd10e0",
  learning: "#f8e71c",
  finance: "#50e3c2",
  miscellaneous: "#9b9b9b",
};

const getSlide = ({ tag, totalCount, weekCount, monthCount }) => {
  return (
    <div className="slide">
      <p className="slide__title">Today's {tag} Tasks</p>
      <h2 className="slide__number">{totalCount}</h2>
      <div className="slide__past-record">
        <div className="slide__week">
          <p>This Week</p>
          <h3 className="slide__number">{weekCount}</h3>
        </div>
        <div className="slide__month">
          <p>This Month</p>
          <h2 className="slide__number">{monthCount}</h2>
        </div>
      </div>
    </div>
  );
};

const FrontPage = ({ className }) => {
  const { data: tasks } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState(
    tasks && tasks.length > 0 ? tasks[0] : null
  );

  const openSlide = (slideIndex) => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${100 * slideIndex}%)`;
    });
    document.querySelector(".slides__controls--previous").dataset.slide =
      slideIndex - 1;
    document.querySelector(".slides__controls--next").dataset.slide =
      slideIndex + 1;
  };

  const nextSlide = () => {
    let currSlide = +document.querySelector(".slides__controls--next").dataset
      .slide;
    const slides = document.querySelectorAll(".slide");
    if (currSlide < 0) currSlide = slides.length - 1;
    if (currSlide >= slides.length) currSlide = 0;
    openSlide(currSlide);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const changeSlide = (e) => {
    const target = e.target.closest("button");
    if (!target) return;
    const slideIndex = +target.dataset.slide;
    openSlide(slideIndex);
  };

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
          <div className="slides">
            {getSlide({
              tag: "Total",
              totalCount: 4,
              weekCount: 10,
              monthCount: 20,
            })}
            {getSlide({
              tag: "Personal",
              totalCount: 3,
              weekCount: 8,
              monthCount: 15,
            })}
            {getSlide({
              tag: "Learning",
              totalCount: 5,
              weekCount: 12,
              monthCount: 25,
            })}
          </div>
          <div className="slides__controls" onClick={changeSlide}>
            <button className="slides__controls--previous" data-slide="-1">
              ❮
            </button>
            <button className="slides__controls--next" data-slide="2">
              ❯
            </button>
          </div>
          <div className="tasks">
            <div className="tasks__listing">
              <h2>Tasks</h2>
              <ul className="tasks__list--today" onClick={handleTask}>
                {tasks && tasks.length > 0
                  ? tasks.map((task, index) =>
                      TaskCard({
                        currentTask: task,
                        colorcode,
                        key: index,
                        "data-index": index,
                        active: index === active,
                      })
                    )
                  : "No tasks for today"}
              </ul>
            </div>
            {currentTask && (
              <div className="tasks__details--current">
                {TaskCard({
                  currentTask,
                  colorcode,
                })}
                <div className="description">{currentTask.description}</div>
              </div>
            )}
          </div>
          <div style={{ width: "100%", height: "300px" }}>
            <PieChart {...chartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPage;
