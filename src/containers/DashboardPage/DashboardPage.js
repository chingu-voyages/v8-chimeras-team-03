import React, { Component } from "react";
import "./DashboardPage.scss";
import logo from "../../assets/Group 10@2x.png";
import logout from "../../assets/Logout  10@2x.png";
import startButton from "../../assets/Group 44@2x.png";
import stopButton from "../../assets/Group 47@2x.png";
import { timeParser, onTimerClick } from "../../services/timers";
import firebase, { auth } from "../../components/Firebase/firebase";
import { dataPacking } from "../../services/dataPacking";
import TaskList from "../../components/TaskList/TaskList";
import { removeTask } from "../../services/removeTask";
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";

class DashboardPage extends Component {
  constructor() {
    super();
    this.onTimerClick = onTimerClick.bind(this);
    this.removeTask = removeTask.bind(this);
  }
  state = {
    startTask: true, // check if task should start or end
    id: "", // mock for id
    taskId: localStorage.getItem("taskId") !== null ? localStorage.getItem("taskId"): "",
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
    loading: true,
    haveUnfinishedBusiness: localStorage.getItem("taskId") !== null ? true : false,
    listofTasks: {} // object that holds all task data
  };
  handleLogOut = async event => {
    try {
      await auth.signOut();
      localStorage.setItem("isLogged", false);
    } catch (error) {
      alert(error);
    }
  };

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(() => {
          this.tasks = firebase.database().ref("tasks/" + user.uid);
          this.tasks.on(
            "value",
            snapshot => {
              var tasks = snapshot.val() || {};
              /// local storage
              var x;
              console.log(localStorage.getItem("taskId")!== null)
              if(this.state.haveUnfinishedBusiness){
                this.setState(()=>({haveUnfinishedBusiness:false}))
              for( x in tasks) {
                if(x === this.state.taskId) {
                  this.setState(()=>({
                    taskName: tasks[x].taskName,
                    startTask: false,
                    timer : Math.floor(Date.now() - tasks[x].startTime)/1000
                  }))
                  // console.log("hello from comp will mount")
                  const interval = setInterval(() => {
                    this.setState(prevState => ({
                      timer: prevState.timer + 1
                    }));
                  }, 1000);
                  
                  this.setState({
                    intervalId: interval
                  });
                }
              }}
              this.setState(() => {
                return {
                  listofTasks: tasks,
                  loading: false
                };
              });
            },
            function(errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
          return {
            user: user,
            id: user.uid
          };
        });
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
      console.log("update", "user", this.state.id, "task",  this.state.taskId)
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
    const { startTask, taskName, listofTasks, loading, timer } = this.state;
    const { onTimerClick, onInputChange } = this;
    const { hours, minutes, seconds } = timeParser(this.state.timer);
    const tasks = dataPacking(listofTasks);

    console.log(tasks);
    return (
      <div className="dashboard">
        <Helmet>
          <meta charSet="utf-8" />
          {timer !== 0 ? (
            <title>
              {hours}:{minutes}:{seconds}
            </title>
          ) : (
            <title>Toggl clone</title>
          )}
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
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
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Loader type="Oval" color="red" height={80} width={80} />
            </div>
          ) : (
            <div className="taskList">
              <ul>
                {tasks.length > 0
                  ? tasks.map((task, i) => {
                      return (
                        <TaskList
                          key={i}
                          task={task}
                          removeTask={this.removeTask}
                        />
                      );
                    })
                  : ""}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default DashboardPage;
