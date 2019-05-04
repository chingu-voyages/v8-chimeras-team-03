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
      const date = new Date(currentTask.endTime).toLocaleDateString();
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
//   // task array contains list of all tasks
//   // each task is an object
//   // task: {
//   //   singleTask: true/false // has this task been used multiple times
//   //   times: [
//   //     {
//   //       startTime: num,
//   //       endTime: num,
//   //       timeDif: num
//   //     },
//   //     {
//   //       startTime: num,
//   //       endTime: num,
//   //       timeDif: num
//   //     }
//   //   ],
//   //   taskName: name,
//   //   sumTimeDifference: timeDif, // sums all time differences
//   //
//   // }
//   const days = [];
//   if (Object.keys(listofTasks).length > 0) {
//     var x;
//     for (x in listofTasks) {
//       // console.log(new Date(listofTasks[x].endTime).toLocaleDateString());
//       const dateIndex = days.findIndex(element => {
//         return (
//           element[0] === new Date(listofTasks[x].endTime).toLocaleDateString()
//         );
//       });
//       if (dateIndex !== -1) {
//         // if there is task  with the same date
//         // const nameIndex = days[dateIndex][1].findIndex(element => {
//         //   return element.taskName === listofTasks[x].taskName;
//         // });
//         ///////////////
//         days[dateIndex][1] = {
//           taskId: [...days[dateIndex][1].taskId, x],
//           taskName: [...days[dateIndex][1].taskName],
//           singleTask: false,
//           times: [
//             ...days[dateIndex][1].times,
//             {
//               startTime: listofTasks[x].startTime,
//               endTime: listofTasks[x].endTime,
//               timeDif: listofTasks[x].endTime - listofTasks[x].startTime
//             }
//           ],
//           sumTimeDif:
//             listofTasks[x].endTime -
//             listofTasks[x].startTime +
//             days[dateIndex][1].sumTimeDif
//         };
//         // console.log(days[dateIndex][1]);
//         ////////////////
//       } else {
//         // if there is no days with the same date
//         const nameIndex = days[dateIndex][1].findIndex(element => {
//           return element.taskName === listofTasks[x].taskName;
//         });
//         if (nameIndex !== -1) {
//           // if there is task with the same name
//           console.log(days[dateIndex][1][nameIndex]);
//           // days.unshift([
//           //   new Date(listofTasks[x].endTime).toLocaleDateString(),
//           //   [
//           //     {
//           //       taskId: [...days[dateIndex][0].taskId,[x]],
//           //       taskName: [listofTasks[x].taskName],
//           //       // sumTimeDif: console.log(days[days.length - 1][1]),
//           //       singleTask: true,
//           //       times: [
//           //         {
//           //           startTime: listofTasks[x].startTime,
//           //           endTime: listofTasks[x].endTime,
//           //           timeDif: listofTasks[x].endTime - listofTasks[x].startTime
//           //         }
//           //       ]
//           //     }
//           //   ]
//           // ]);
//           // days[0][1].sumTimeDif = days[0][1].times[0].timeDif;
//         } else {
//           // if there is no task with the same name
//           days.unshift([
//             new Date(listofTasks[x].endTime).toLocaleDateString(),
//             [
//               {
//                 taskId: [x],
//                 taskName: [listofTasks[x].taskName],
//                 // sumTimeDif: console.log(days[days.length - 1][1]),
//                 singleTask: true,
//                 times: [
//                   {
//                     startTime: listofTasks[x].startTime,
//                     endTime: listofTasks[x].endTime,
//                     timeDif: listofTasks[x].endTime - listofTasks[x].startTime
//                   }
//                 ]
//               }
//             ]
//           ]);
//           days[0][1].sumTimeDif = days[0][1].times[0].timeDif;
//         }
//       }
//     }
//     /* var x;
//     for (x in listofTasks) {
//       // eslint-disable-next-line no-loop-func
//       // console.log(new Date(listofTasks[x].endTime).toLocaleDateString());
//       const index = tasks.findIndex(element => {
//         return element.taskName === listofTasks[x].taskName;
//       });
//       if (index !== -1) {
//         // there is already a task with the same name
//         tasks[index] = {
//           taskId: [...tasks[index].taskId, x],
//           taskName: tasks[index].taskName,
//           singleTask: false,
//           times: [
//             ...tasks[index].times,
//             {
//               startTime: listofTasks[x].startTime,
//               endTime: listofTasks[x].endTime,
//               timeDif: listofTasks[x].endTime - listofTasks[x].startTime
//             }
//           ],
//           sumTimeDif:
//             listofTasks[x].endTime -
//             listofTasks[x].startTime +
//             tasks[index].sumTimeDif
//         };
//       } else {
//         // there is no task with the same name
//         tasks.unshift({
//           taskId: [x],
//           taskName: listofTasks[x].taskName,
//           singleTask: true,
//           times: [
//             {
//               startTime: listofTasks[x].startTime,
//               endTime: listofTasks[x].endTime,
//               timeDif: listofTasks[x].endTime - listofTasks[x].startTime
//             }
//           ]
//         });
//         tasks[0].sumTimeDif = tasks[0].times[0].timeDif;
//       }
//     }
//     */
//     console.log(days);
//   }
//   return days;
// }
// // function checkForSameName(dayIndex) {
// //   const index = tasks.findIndex(element => {
// //     return element.taskName === listofTasks[x].taskName;
// //   });
// //   if (index !== -1) {
// //     // there is already a task with the same name
// //     tasks[index] = {
// //       taskId: [...tasks[index].taskId, x],
// //       taskName: tasks[index].taskName,
// //       singleTask: false,
// //       times: [
// //         ...tasks[index].times,
// //         {
// //           startTime: listofTasks[x].startTime,
// //           endTime: listofTasks[x].endTime,
// //           timeDif: listofTasks[x].endTime - listofTasks[x].startTime
// //         }
// //       ],
// //       sumTimeDif:
// //         listofTasks[x].endTime -
// //         listofTasks[x].startTime +
// //         tasks[index].sumTimeDif
// //     };
// //   }
