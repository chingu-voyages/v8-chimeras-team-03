import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser } from "../../services/timers";

export default function TaskList(props) {
  const { task, removeTask } = props;

  return (
    <div>
      <li
        onClick={e => {
          console.log(e.currentTarget.parentElement);
          if (
            e.currentTarget.parentElement.childNodes[1].style.display === "none"
          ) {
            e.currentTarget.parentElement.childNodes[1].style.display = "block";
          } else {
            e.currentTarget.parentElement.childNodes[1].style.display = "none";
          }
        }}
      >
        <div className="task">
          <div className="task-name">
            {task.taskName} {task.times.length}
          </div>
          <div className="task-duration">
            {timeParser(task.sumTimDif / 1000).hours}:
            {timeParser(task.sumTimDif / 1000).minutes}:
            {timeParser(task.sumTimDif / 1000).seconds}
          </div>

          <span onClick={() => removeTask(task.taskId)}>X</span>
        </div>
      </li>
      {task.singleTask ? (
        ""
      ) : (
        <div style={{ display: "none" }}>
          {task.times.map((subTask, i) => {
            console.log(subTask);
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
