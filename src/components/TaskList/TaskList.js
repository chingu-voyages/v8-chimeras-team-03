import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser, removeNaN } from "../../services/timers";
import "./TaskList.scss";

export default function TaskList(props) {
  const { task, removeTask } = props;
  const data = task[1];
  /* 
display today and yesterday
restyle
add when task has started and stopped
animacija
  */
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
      <div className="date">{date}</div>
      {data.map((sameNameTasks, i) => {
        return (
          <div key={i}>
            <li>
              <div className="task">
                <div className="task-name">
                  {sameNameTasks.times.length > 1 ? (
                    <span
                      className="num-of-subtasks"
                      style={{ cursor: "pointer" }}
                      onClick={e => {
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
                  <span>{sameNameTasks.taskName} </span>
                </div>
                <div className="task-duration">
                  {removeNaN(
                    timeParser(sameNameTasks.sumTimeDif / 1000).hours,
                    timeParser(sameNameTasks.sumTimeDif / 1000).minutes,
                    timeParser(sameNameTasks.sumTimeDif / 1000).seconds
                  )}
                  <span
                    style={{ color: "red", cursor: "pointer" }}
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
