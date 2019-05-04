export function dataPacking(listofTasks) {
  /* things to do:
 1. sort list of task by date

 */
  const days = [];
  if (Object.keys(listofTasks).length > 0) {
    var x;
    for (x in listofTasks) {
      //  1. sorting by date
      const currentTask = listofTasks[x];
      const date = new Date(currentTask.startTime).toLocaleDateString();
      const dateIndex = days.findIndex(element => {
        return element[0] === date;
      });
      if (dateIndex !== -1) {
        // same date
        const currentDate = days[dateIndex][1];

        const nameIndex = currentDate.findIndex(element => {
          return currentTask.taskName === element.taskName;
        });
        if (nameIndex !== -1) {
          // same date and same name
          const currentName = currentDate[nameIndex];
          // console.log(currentTask);
          currentName.taskId.unshift(x);
          currentName.sumTimeDif =
            currentName.sumTimeDif +
            currentTask.endTime -
            currentTask.startTime;
          currentName.times.unshift({
            startTime: currentTask.startTime,
            endTime: currentTask.endTime,
            timeDif: currentTask.endTime - currentTask.startTime
          });
          array_move(currentDate, nameIndex, 0);
        } else {
          // same date and different name
          currentDate.unshift({
            taskId: [x],
            taskName: currentTask.taskName,
            sumTimeDif: currentTask.endTime - currentTask.startTime,
            times: [
              {
                startTime: currentTask.startTime,
                endTime: currentTask.endTime,
                timeDif: currentTask.endTime - currentTask.startTime
              }
            ]
          });
        }
      } else {
        // different date
        days.unshift([
          date,
          [
            {
              taskId: [x],
              taskName: currentTask.taskName,
              sumTimeDif: currentTask.endTime - currentTask.startTime,
              times: [
                {
                  startTime: currentTask.startTime,
                  endTime: currentTask.endTime,
                  timeDif: currentTask.endTime - currentTask.startTime
                }
              ],
              sumTimeDif: currentTask.endTime - currentTask.startTime
            }
          ]
        ]);
      }
    }
  }
  return days;
}

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
