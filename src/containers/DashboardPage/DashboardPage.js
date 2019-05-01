import React, { Component } from "react";
import "./DashboardPage.scss";
import logo from "../../assets/Group 10@2x.png";
import logout from "../../assets/Logout  10@2x.png";
import startButton from "../../assets/Group 44@2x.png";
import stopButton from "../../assets/Group 47@2x.png";
import { timeParser } from "../../services/timers";
import firebase, { auth } from "../../components/Firebase/firebase";

class DashboardPage extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  state = {
    startTask: true, // check if task should start or end
    id: "", // mock for id
    taskId: "",
    startTime: 0, // start time in miliseconds
    endTime: 0, // end time in milliseconds
    taskName: "",
    timer: 0, // time of task in seconds (changes every second after the task is started)
    intervalId: "", // intervalId for clearInterval
    taskTime: {
      hours: "00",
      minutes: "00",
      seconds: "00"
    },
    listofTasks: {} // object that holds all task data
  };
  handleLogOut = async event => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(error);
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
    } else {
      // stop timer
      clearInterval(this.state.intervalId);
      this.setState({
        startTask: true,
        endTime: Date.now(),
        intervalId: "",
        timer: 0
      });
    }
  };
  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(() => {
          return {
            user: user,
            id: user.uid
          };
        });
        this.tasks = firebase.database().ref("tasks/" + this.state.id);
        // console.log(this.state.user)
        this.tasks.on(
          "value",
          snapshot => {
            var tasks = snapshot.val();
            this.setState(() => {
              return {
                listofTasks: tasks
              };
            });
          },
          function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.startTime !== prevState.startTime) {
      let push = firebase
        .database()
        .ref("tasks/" + this.state.id + "/")
        .push({
          taskName: this.state.taskName,
          startTime: this.state.startTime
        });
      // eslint-disable-next-line
      let taskId = this.setState({
        taskId: push.key
      });
    }
    if (this.state.endTime !== prevState.endTime) {
      firebase
        .database()
        .ref("tasks/" + this.state.id + "/" + this.state.taskId)
        .update({
          endTime: this.state.endTime
        });
    }
  }

  onInputChange = e => {
    this.setState({
      taskName: e.target.value
    });
  };
  render() {
    const { startTask, taskName, listofTasks } = this.state;
    const { onTimerClick, onInputChange } = this;
    const { hours, minutes, seconds } = timeParser(this.state.timer);
    const tasks = [];
    if (Object.keys(listofTasks).length > 0) {
      var x;
      for (x in listofTasks) {
        tasks.push([
          listofTasks[x].taskName,
          listofTasks[x].startTime,
          listofTasks[x].endTime
        ]);
      }
    }
    return (
      <div className="dashboard">
        <div className="menu">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>toggl clone</p>
          </div>
          <button className="logout-btn">
            <img src={logout} alt="logout button" onClick={this.handleLogOut} />
            <p>Log Out</p>
          </button>
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
          <div className="taskList">
            <ul>
              {/* {tasks.length>0?tasks:""} */}
              {tasks.length > 0
                ? tasks.map((task, i) => (
                    <li key={i}>
                      <div className="task">
                        <div className="task-name">{task[0] || "----"}</div>
                        <div className="task-duration">
                          {console.log(timeParser(task[2] - task[1]))}
                          {timeParser((task[2] - task[1]) / 1000).hours}:
                          {timeParser((task[2] - task[1]) / 1000).minutes}:
                          {timeParser((task[2] - task[1]) / 1000).seconds}
                        </div>
                      </div>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardPage;
