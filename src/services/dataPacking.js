export function dataPacking(listofTasks) {
  // task array contains list of all tasks
  // each task is an object
  // task: {
  //   singleTask: true/false // has this task been used multiple times
  //   times: [
  //     {
  //       startTime: num,
  //       endTime: num,
  //       timeDif: num
  //     },
  //     {
  //       startTime: num,
  //       endTime: num,
  //       timeDif: num
  //     }
  //   ],
  //   taskName: name,
  //   sumTimeDifference: timeDif, // sums all time differences
  //
  // }

  const days = [];
  const tasks = [];
  if (Object.keys(listofTasks).length > 0) {
    var x;
    for (x in listofTasks) {
      // eslint-disable-next-line no-loop-func
      // console.log(new Date(listofTasks[x].endTime).toLocaleDateString());

      const index = tasks.findIndex(element => {
        return element.taskName === listofTasks[x].taskName;
      });
      if (index !== -1) {
        // there is already a task with the same name
        tasks[index] = {
          taskId: [...tasks[index].taskId, x],
          taskName: tasks[index].taskName,
          singleTask: false,
          times: [
            ...tasks[index].times,
            {
              startTime: listofTasks[x].startTime,
              endTime: listofTasks[x].endTime,
              timeDif: listofTasks[x].endTime - listofTasks[x].startTime
            }
          ],
          sumTimeDif:
            listofTasks[x].endTime -
            listofTasks[x].startTime +
            tasks[index].sumTimeDif
        };
      } else {
        // there is no task with the same name

        tasks.unshift({
          taskId: [x],
          taskName: listofTasks[x].taskName,
          singleTask: true,
          times: [
            {
              startTime: listofTasks[x].startTime,
              endTime: listofTasks[x].endTime,
              timeDif: listofTasks[x].endTime - listofTasks[x].startTime
            }
          ]
        });
        tasks[0].sumTimeDif = tasks[0].times[0].timeDif;
      }
    }
  }

  return tasks;
}
