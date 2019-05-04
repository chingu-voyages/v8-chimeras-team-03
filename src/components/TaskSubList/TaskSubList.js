import React from "react";
import { timeParser } from "../../services/timers";
import { removeNaN } from "../../services/timers";

export default function SubList(props) {
  return (
    <li>
      <div className="task">
        {"- " + props.task.taskName}
        <div className="task-duration">
          {removeNaN(
            timeParser(props.subTask.timeDif / 1000).hours,
            timeParser(props.subTask.timeDif / 1000).minutes,
            timeParser(props.subTask.timeDif / 1000).seconds
          )}
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              let i = 1;
              props.removeTask([props.task.taskId[i]]);
            }}
          >
            X
          </span>
        </div>
      </div>
    </li>
  );
}
