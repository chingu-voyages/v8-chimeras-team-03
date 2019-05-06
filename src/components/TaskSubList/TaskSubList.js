import React from "react";
import { timeParser, formatAMPM } from "../../services/timers";
import { removeNaN } from "../../services/timers";
import "./TaskSubList.scss";

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
          <span> </span>
          <span id="sub-task-duration">
            {removeNaN(
              timeParser(props.subTask.timeDif / 1000).hours,
              timeParser(props.subTask.timeDif / 1000).minutes,
              timeParser(props.subTask.timeDif / 1000).seconds
            )}
          </span>
          <span
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              console.log(props.i);
              props.removeTask([props.task.taskId[props.i]]);
            }}
          >
            X
          </span>
        </div>
      </div>
    </li>
  );
}
