import React, { Component } from "react";
import "./DashboardPage.scss";
import logo from "../../assets/Group 10@2x.png";
import startButton from "../../assets/Group 44@2x.png";
import stopButton from "../../assets/Group 47@2x.png";

class DashboardPage extends Component {
  state = {
    startTask: true
  };
  onTimerClick = () => {
    if (this.state.startTask) {
      this.setState({
        startTask: false
      });
    } else {
      this.setState({
        startTask: true
      });
    }
  };
  render() {
    const { startTask } = this.state;
    const { onTimerClick } = this;
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
            <input type="text" placeholder="What are you working on?" />
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
