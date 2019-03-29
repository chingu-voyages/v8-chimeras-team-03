export function startTimer(data) {
  fetch("/api/start", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
export function stopTimer(data) {
  fetch("/api/stop", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
