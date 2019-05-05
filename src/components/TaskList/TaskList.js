import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser, removeNaN } from "../../services/timers";
import "./TaskList.scss";
import Buttons from "../Buttons/Buttons";

export default function TaskList(props) {
  const { task, removeTask } = props;
  const data = task[1];

  let date;
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();
  if (task[0] === new Date(Date.now()).toLocaleDateString()) {
    date = "Today";
  } else if (task[0] === yesterday) {
    date = "Yesterday";
  } else {
    date = task[0];
  }
  return (
    <div>
      <div className="date" style={{ fontWeight: "bold" }}>
        <div>{date}</div>
        <div
          style={{ marginRight: "20px", fontWeight: "bold" }}
          className="date-time"
        >
          {removeNaN(
            timeParser(task[2] / 1000).hours,
            timeParser(task[2] / 1000).minutes,
            timeParser(task[2] / 1000).seconds
          )}
        </div>
      </div>
      {data.map((sameNameTasks, i) => {
        return (
          <div key={i}>
            <li>
              <div className="task">
                <div className="task-name">
                  {sameNameTasks.times.length > 1 ? (
                    <span
                      className="num-of-subtasks"
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                      onClick={e => {
                        const style = e.target.style;
                        if (style.backgroundColor == "white") {
                          style.backgroundColor = "GhostWhite";
                          style.color = "green";
                        } else {
                          style.backgroundColor = "white";
                          style.color = "black";
                        }
                        const element =
                          e.currentTarget.parentElement.parentElement
                            .parentElement.parentElement;
                        if (element.childNodes[1].style.display === "none") {
                          element.childNodes[1].style.display = "block";
                        } else {
                          element.childNodes[1].style.display = "none";
                        }
                      }}
                    >
                      {sameNameTasks.times.length}
                    </span>
                  ) : (
                    ""
                  )}
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {sameNameTasks.taskName}{" "}
                  </span>
                </div>
                <div className="task-duration">
                  {removeNaN(
                    timeParser(sameNameTasks.sumTimeDif / 1000).hours,
                    timeParser(sameNameTasks.sumTimeDif / 1000).minutes,
                    timeParser(sameNameTasks.sumTimeDif / 1000).seconds
                  )}
                  <Buttons
                    taskRestart={props.taskRestart}
                    name={sameNameTasks.taskName}
                  />
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "15px"
                    }}
                    onClick={event => {
                      const element =
                        event.target.parentElement.parentElement.parentElement
                          .parentElement;
                      if (element.childNodes[1].nodeName !== "#text") {
                        element.childNodes[1].style.display = "none";
                      }

                      removeTask(sameNameTasks.taskId);
                    }}
                  >
                    X
                  </span>
                </div>
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
                      i={i}
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
