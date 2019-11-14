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
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0){
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(secondsLeft);
        
        remaining = Math.round(secondsLeft)
    
    }, 1000)
} 

// timer display

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = Math.floor(seconds % 60);
    const display = `${minutes > 10 ? minutes : '0' + minutes} : ${remainderSeconds > 9 ? remainderSeconds : '0' + remainderSeconds}`
    document.getElementById("timer").textContent = display;
    document.title = display;

    // alarm sound
    if (display === "00 : 00"){
        const sound = new Audio();
        sound.src = "./resources/audio/alarm.wav"
        sound.play();
        document.title = 'you did it!';
    }
}

// audio references

const sound1 = document.getElementById("sound1");


// start, stop & resume buttons

function startTimer() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
    stopBtn.textContent = 'stop';
    //startBtn.addEventListener('click', justDoItSounds.play())
};

function startBreak() {
    const seconds = this.id;
    timer(seconds)
    //startBtn.addEventListener('click', sound.play())
    isOn = true;
    stopBtn.textContent = 'stop';
};

function stop() {
    clearInterval(countdown)
    stopBtn.textContent = 'resume';
    isOn = false;
};

function resume() {
        stopBtn.textContent = 'stop';
        isOn = true;
        timer(remaining)
};

startBtn.addEventListener('click', startTimer)
startBtn.addEventListener('click', function(){
    // adding a random 'Just do it' sound to the click;
    function randomJustDoItSounds(){
        const allFiles = ["just-do-it-1.wav", "just-do-it-2.wav", "just-do-it-3.wav", "just-do-it-4.wav", "do-it.wav", "do-it-1.wav", "do-it-2.wav", "dreams-be-dreams.wav", "nothing-is-impossible.wav", "yes-you-can.wav", "make-your-dreams.wav"]
        const randomNum = Math.floor(Math.random() * allFiles.length)
        return allFiles[randomNum];
    };

    const justDoItSounds = new Audio();
    justDoItSounds.src = './resources/audio/' + randomJustDoItSounds()
    justDoItSounds.play();
});

shortBreakBtn.addEventListener('click', startBreak)

longBreakBtn.addEventListener('click', startBreak)

/* stopBtn.addEventListener('click', function() {
    isOn ? stop() : resume();
  }); */

stopBtn.addEventListener('click', function() {

    if (isOn){
        stop()
        function randomStopSounds(){
            const allFiles = ["not-gonna-stop-there.wav", "stop-giving-up.wav", "yesterday.wav"]
            const randomNum = Math.floor(Math.random() * allFiles.length)
            return allFiles[randomNum];
        };
        
        const StopSounds = new Audio();
        StopSounds.src = './resources/audio/' + randomStopSounds()
        StopSounds.play();
    }
    else{
        if(document.getElementById("timer").textContent === '25 : 00'){
            return;
        }
        else{
            resume();
        }

        //console.log('teste')
    }
  });




/* const justDoItSounds = new Audio();
//justDoItSounds.src = "./resources/audio/just-do-it-1.wav" // need to add something to target based on the name of each file, as in "intro to javascript audio effects" - 3:14
justDoItSounds.src = './resources/audio/' + randomJustDoItSounds()
console.log(justDoItSounds.src)

function randomJustDoItSounds(){
    const allJustDoItFiles = ["just-do-it-1.wav", "just-do-it-2.wav", "just-do-it-3.wav", "just-do-it-4.wav", "do-it.wav", "do-it-1.wav", "do-it-2.wav"]
    const randomNum = Math.floor(Math.random() * allJustDoItFiles.length)
    return allJustDoItFiles[randomNum];
};

randomJustDoItSounds() */


const allStopFiles = ["not-gonna-stop-there.wav", "stop-giving-up.wav", "what-are-you-waiting"]