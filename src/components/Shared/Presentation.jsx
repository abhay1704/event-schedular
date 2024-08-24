import { useEffect } from "react";
import {getStats} from "../../utils/utils";                                    
import "./Presentation.css";

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

const handleChangeSlide = (e) => {
  const target = e.target.closest("button");
  if (!target) return;
  const slideIndex = +target.dataset.slide;
  openSlide(slideIndex);
};

const Presentation = ({tasks}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = getStats(tasks);

  return (
    <>
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
      <div className="slides__controls" onClick={handleChangeSlide}>
        <button className="slides__controls--previous" data-slide="-1">
          ❮
        </button>
        <button className="slides__controls--next" data-slide="2">
          ❯
        </button>
      </div>
    </>
  );
};

export default Presentation;
