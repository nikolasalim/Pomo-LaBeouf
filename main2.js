let countdown;
const startBtn = document.getElementById("1500");
const stopBtn = document.getElementById("stop");
let isOn = false;
let remaining;

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

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes > 10 ? minutes : '0' + minutes} : ${remainderSeconds > 9 ? remainderSeconds : '0' + remainderSeconds}`
    document.getElementById("timer").innerHTML = display;
    document.title = display;
}

//timer(15);

// Timer Buttons

function startTimer() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
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

stopBtn.addEventListener('click', function() {
    isOn ? stop() : resume();
  });


/* function stop() {
    clearInterval(countdown)
    stopBtn.innerHTML = 'resume';
    isOn = false;
};

function resume() {
    console.log(displayTimeLeft)
    stopBtn.innerHTML = 'stop';
    isOn = true;
};

stopBtn.addEventListener('click', function() {
    isOn ? stop() : resume();
  }); */