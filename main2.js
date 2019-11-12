let countdown;
let isOn = false;
let remaining;

const startBtn = document.getElementById("1500");
const shortBreakBtn = document.getElementById("300");
const longBreakBtn = document.getElementById("900");
const stopBtn = document.getElementById("stop");

// timer functionality

function timer(seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    clearInterval(countdown)   

    countdown = setInterval(() => {
        const secondsLeft = (then - Date.now()) / 1000;

        if (secondsLeft < 0){
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(Math.round(secondsLeft));
        
        remaining = Math.round(secondsLeft)

    }, 1000)
} 

// timer display

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes > 10 ? minutes : '0' + minutes} : ${remainderSeconds > 9 ? remainderSeconds : '0' + remainderSeconds}`
    document.getElementById("timer").innerHTML = display;
    document.title = display;
}

// start, stop & resume buttons

function startTimer() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
    stopBtn.innerHTML = 'stop';
};

function stop() {
    clearInterval(countdown)
    stopBtn.innerHTML = 'resume';
    isOn = false;
};

function resume() {
    stopBtn.innerHTML = 'stop';
    isOn = true;
    timer(remaining)
};

startBtn.addEventListener('click', startTimer)

shortBreakBtn.addEventListener('click', startTimer)

longBreakBtn.addEventListener('click', startTimer)

stopBtn.addEventListener('click', function() {
    isOn ? stop() : resume();
  });