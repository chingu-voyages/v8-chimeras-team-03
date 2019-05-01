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
  const tasks = [];
  if (Object.keys(listofTasks).length > 0) {
    var x;
    for (x in listofTasks) {
      const index = tasks.findIndex(element => {
        return element.taskName === listofTasks[x].taskName;
      });
      if (index !== -1) {
        // there is already a task with the same name
        tasks[index] = {
          taksName: tasks[index].taskName,
          singleTask: false,
          times: [
            ...tasks[index].times,
            {
              startTime: listofTasks[x].startTime,
              endTime: listofTasks[x].endTime,
              timeDif: listofTasks[x].endTime - listofTasks[x].startTime
            }
          ],
          sumTimDif: tasks[index].times.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.timeDif;
          }, 0)
        };
      } else {
        // there is no task with the same name
        tasks.push({
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
        tasks[tasks.length - 1].sumTimDif =
          tasks[tasks.length - 1].times[0].timeDif;
      }
    }
  }

  return tasks;
}
