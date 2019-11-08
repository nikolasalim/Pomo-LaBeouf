let countdown;
const startBtn = document.getElementById("1500");
const stopBtn = document.getElementById("stop");
let isOn = false;

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
    }, 1000)
} 

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes > 10 ? minutes : '0' + minutes} : ${remainderSeconds > 9 ? remainderSeconds : '0' + remainderSeconds}`
    document.getElementById("timer").innerHTML = display;
    document.title = display;
}

//timer(15);

function start() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
};

function stop() {
    clearInterval(countdown)
    stopBtn.innerHTML = 'resume';
};

/* function resumeTimer(){
    timer(15)

    stopBtn.innerHTML = 'stop'
    stopBtn.addEventListener('click', startTimer)
}; */

startBtn.addEventListener('click', start)
//stopBtn.addEventListener('click', stopTimer)



stopBtn.addEventListener('click', function() {
    isOn ? stop() : start();
  });