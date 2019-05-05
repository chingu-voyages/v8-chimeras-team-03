import firebase from "../components/Firebase/firebase";
import { stopTimer } from "./timers";
export async function removeTask(taskId) {
  this.stopTimer = stopTimer.bind(this);

  if (taskId[0] == this.state.taskId) {
    // check if the task user wants to delete is currently beeing worked on
    console.log("hey");
    await this.stopTimer();
  }
  taskId.forEach((task, i) => {
    const url = "tasks/" + this.state.id + "/" + task;

    const deleteTask = firebase.database().ref(url);
    deleteTask.on(
      "value",
      snapshot => {
        var tasks = snapshot.val();
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    deleteTask
      .remove()
      .then(data => console.log(data, "removed"))
      .catch(err => console.log(err));
  });
}
