import React from "react";
import "./Buttons.scss";

export default function Buttons(props) {
  return (
    <span
      id="task-button"
      onClick={e => {
        props.taskRestart(props.name);
      }}
    />
  );
}
