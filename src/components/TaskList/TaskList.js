import React from "react";
import SubList from "../TaskSubList/TaskSubList";
import { timeParser } from "../../services/timers";

export default function TaskList(props) {
  const { task, removeTask } = props;

  return (
    <div onClick={e => console.log(e.currentTarget.childNodes[0].className)}>
      <li>
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
        <div>
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
