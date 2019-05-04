import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser, removeNaN } from "../../services/timers";
import "./TaskList.scss";

export default function TaskList(props) {
  const { task, removeTask } = props;
  const data = task[1];

  return (
    <div>
      <div className="date">DATE: {task[0]}</div>
      {console.log(task[0] === "Invalid Date")}
      {data.map((sameNameTasks, i) => {
        return (
          <div key={i}>
            <li>
              <div className="task">
                <div className="task-name">
                  {sameNameTasks.taskName}{" "}
                  {sameNameTasks.times.length > 1 ? (
                    <span
                      className="num-of-subtasks"
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        if (
                          e.currentTarget.parentElement.parentElement
                            .parentElement.parentElement.childNodes[1].style
                            .display === "none"
                        ) {
                          e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].style.display =
                            "block";
                        } else {
                          e.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes[1].style.display =
                            "none";
                        }
                      }}
                    >
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
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={event => {
                    event.target.parentElement.parentElement.parentElement.childNodes[1].style.display =
                      "none"; // fix for display bug

                    removeTask(sameNameTasks.taskId);
                  }}
                >
                  X
                </span>
              </div>
            </li>

            {sameNameTasks.times.length <= 1 ? (
              ""
            ) : (
              <div style={{ display: "none" }}>
                {sameNameTasks.times.map((subTask, i) => {
                  return (
                    <SubList
                      key={i}
                      subTask={subTask}
                      task={sameNameTasks}
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
