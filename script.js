const timeDisplay = document.querySelector("#timeDisplay");
const startStopBtn = document.querySelector("#startStopBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;

startStopBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 2500);
    }
    else {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})
resetBtn.addEventListener("click", () => {
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    paused = true;
    hrs = 0;
    mins = 0;
    secs = 0;
    ms = 0;
    clearInterval(intervalId);
    timeDisplay.textContent = "00:00:00:00";
})

function updateTime() {
    elapsedTime = Date.now() - startTime;

    ms = Math.floor((elapsedTime) % 60);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    ms = pad(ms);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${ms}`

    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit
    }
}