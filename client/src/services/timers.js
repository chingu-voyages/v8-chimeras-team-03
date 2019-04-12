export function timeParser(time) {
  // recieve time in seconds
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  // 1 hour 3600 sec
  hours = Math.floor(time / 3600);
  minutes = Math.floor((time % 3600) / 60);
  seconds = Math.floor((time % 3600) % 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return {
    hours,
    minutes,
    seconds
  };
}
