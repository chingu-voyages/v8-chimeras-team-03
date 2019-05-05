import React from "react";
import { timeParser, formatAMPM } from "../../services/timers";
import { removeNaN } from "../../services/timers";

export default function SubList(props) {
  return (
    <li>
      <div className="task" id="sub-task">
        <div className="sub-task-name">{props.task.taskName}</div>
        <div className="task-duration">
          {props.subTask.endTime === undefined ? (
            ""
          ) : (
            <span>
              {formatAMPM(new Date(props.subTask.startTime))} -{" "}
              {formatAMPM(new Date(props.subTask.endTime))}{" "}
            </span>
          )}
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
