import React, { Component } from "react";
import "./DashboardPage.scss";
import logo from "../../assets/Group 10@2x.png";
import startButton from "../../assets/Group 44@2x.png";
import stopButton from "../../assets/Group 47@2x.png";
import { startTimer, stopTimer, timeParser } from "../../services/timers";

class DashboardPage extends Component {
  state = {
    startTask: true, // check if task should start or end
    id: 1, // mock for id
    startTime: 0, // start time in miliseconds
    endTime: 0, // end time in milliseconds
    taskName: "",
    timer: 0, // time of task in seconds (changes every second after the task is started)
    intervalId: "", // intervalId for clearInterval
    taskTime: {
      hours: "00",
      minutes: "00",
      seconds: "00"
    }
  };
  onTimerClick = () => {
    if (this.state.startTask) {
      // start timer
      const interval = setInterval(() => {
        this.setState(prevState => ({
          timer: prevState.timer + 1
        }));
      }, 1000);

      this.setState({
        startTask: false,
        startTime: Date.now(),
        intervalId: interval
      });
      // send post reqest
      startTimer({
        startTime: this.state.startTime,
        id: this.state.id,
        taskName: this.state.taskName
      });
    } else {
      // stop timer
      clearInterval(this.state.intervalId);
      this.setState({
        startTask: true,
        endTime: Date.now(),
        intervalId: "",
        timer: 0
      });
      // send post request
      stopTimer({
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
    const { hours, minutes, seconds } = timeParser(this.state.timer);
    return (
      <div className="dashboard">
        <div className="menu">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>toggl clone</p>
          </div>
        </div>
        <div className="main">
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="What are you working on?"
              value={taskName}
              onChange={onInputChange}
            />
            <div className="timer">
              <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
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
