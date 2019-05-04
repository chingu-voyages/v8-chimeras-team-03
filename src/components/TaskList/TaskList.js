import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser, removeNaN } from "../../services/timers";
import "./TaskList.scss";

export default function TaskList(props) {
  const { task, removeTask } = props;
  const data = task[1];

  return (
    <div>
      DATE: {task[0]}
      {data.map(sameNameTasks => {
        console.log(sameNameTasks);
        return (
          <div>
            <li
              style={{ cursor: "pointer" }}
              onClick={e => {
                if (
                  e.currentTarget.parentElement.childNodes[1].childNodes
                    .length > 1
                ) {
                  if (
                    e.currentTarget.parentElement.childNodes[1].style
                      .display === "none"
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
                  {sameNameTasks.taskName}{" "}
                  {sameNameTasks.times.length > 1 ? (
                    <span className="num-of-subtasks">
                      {sameNameTasks.times.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="task-duration">
                  {removeNaN(
                    timeParser(sameNameTasks.sumTimeDif / 1000).hours,
                    timeParser(sameNameTasks.sumTimeDif / 1000).minutes,
                    timeParser(sameNameTasks.sumTimeDif / 1000).seconds
                  )}
                </div>

                <span
                  style={{ color: "red" }}
                  onClick={() => removeTask(sameNameTasks.taskId)}
                >
                  X
                </span>
              </div>
            </li>
            {sameNameTasks.singleTask ? (
              ""
            ) : (
              <div style={{ display: "none" }}>
                {sameNameTasks.times.map((subTask, i) => {
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
      })}
    </div>
  );
}
