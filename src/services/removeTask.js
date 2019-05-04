import firebase from "../components/Firebase/firebase";
export function removeTask(taskId) {
  taskId.forEach(task => {
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
