import React, { Component } from "react";
import "./DashboardPage.scss";
import logo from "../../assets/Group 10@2x.png";
import startButton from "../../assets/Group 44@2x.png";
import stopButton from "../../assets/Group 47@2x.png";
import { startTimer, stopTimer } from "../../services/post";

class DashboardPage extends Component {
  state = {
    startTask: true,
    id: 1,
    startTime: 0,
    endTime: 0,
    taskName: ""
  };
  onTimerClick = () => {
    if (this.state.startTask) {
      // start timer
      this.setState({
        startTask: false,
        startTime: Date.now()
      });
      startTimer({
        startTime: this.state.startTime,
        id: this.state.id,
        taskName: this.state.taskName
      });
    } else {
      // stop timer
      this.setState({
        startTask: true,
        endTime: Date.now()
      });
      startTimer({
        endTime: this.state.endTime,
        id: this.state.id,
        taskName: this.state.taskName
      });
    }
  };

  onInputChange = e => {
    this.setState({
      taskName: e.target.value
    });
  };
  render() {
    const { startTask, taskName } = this.state;
    const { onTimerClick, onInputChange } = this;
    return (
      <div className="dashboard">
        <div className="menu">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>toggl clone</p>
          </div>
        </div>
        <div className="main">
          <form action="">
            <input
              type="text"
              placeholder="What are you working on?"
              value={taskName}
              onChange={onInputChange}
            />
            <span>0:00:00</span>
            <img
              src={startTask ? startButton : stopButton}
              alt="button"
              onClick={onTimerClick}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
