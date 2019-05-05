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
  hours += "";
  minutes += "";
  seconds += "";

  return {
    hours,
    minutes,
    seconds
  };
}

export function onTimerClick() {
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
}

export function removeNaN(...data) {
  let finalString = "";
  if (isNaN(data[0])) {
    finalString = "Pending";
  } else {
    finalString = `${data[0]}:${data[1]}:${data[2]}`;
  }
  return finalString;
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
