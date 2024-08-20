import "./TaskCard.css";
import { useContext } from "react";
import StylingContext from "../../context/styling";
import { getTime, firstletters } from "../../utils/utils";

const TaskCard = ({
  currentTask: { name, tag, start_time },
  key,
  active,
  ...props
}) => {
  const { colorcode } = useContext(StylingContext);

  return (
    <li
      data-text={firstletters(name)}
      style={{
        "--data-color": colorcode[tag.toLowerCase()],
        "--data-text": firstletters(name),
      }}
      className={`tasks__item${active ? " tasks__item--active" : ""}`}
      key={key}
      {...props}
    >
      <div className="tasks__item-content" data-color="">
        <div className={"tasks__time " + tag.toLowerCase() + "-tag--bg"}>
          <span>{getTime(start_time)}</span>
        </div>
        <div className="tasks__details">
          <h3>{name}</h3>
          <p className={tag.toLowerCase() + "-tag--color tag"}>
            {tag.toLowerCase()}
          </p>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
