import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser, removeNaN } from "../../services/timers";
import "./TaskList.scss";

export default function TaskList(props) {
  const { task, removeTask } = props;

  return (
    <div>
      <li
        style={{ cursor: "pointer" }}
        onClick={e => {
          if (
            e.currentTarget.parentElement.childNodes[1].childNodes.length > 1
          ) {
            if (
              e.currentTarget.parentElement.childNodes[1].style.display ===
              "none"
            ) {
              e.currentTarget.parentElement.childNodes[1].style.display =
                "block";
            } else {
              e.currentTarget.parentElement.childNodes[1].style.display =
                "none";
            }
          }
        }}
      >
        <div className="task">
          <div className="task-name">
            {task.taskName}{" "}
            {task.times.length > 1 ? (
              <span className="num-of-subtasks">{task.times.length}</span>
            ) : (
              ""
            )}
          </div>
          <div className="task-duration">
            {removeNaN(
              timeParser(task.sumTimDif / 1000).hours,
              timeParser(task.sumTimDif / 1000).minutes,
              timeParser(task.sumTimDif / 1000).seconds
            )}
          </div>

          <span
            style={{ color: "red" }}
            onClick={() => removeTask(task.taskId)}
          >
            X
          </span>
        </div>
      </li>
      {task.singleTask ? (
        ""
      ) : (
        <div style={{ display: "none" }}>
          {task.times.map((subTask, i) => {
            return (
              <SubList
                key={i}
                subTask={subTask}
                task={task}
                removeTask={removeTask}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
