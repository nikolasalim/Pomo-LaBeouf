let countdown;
let isOn = false;
let hasRunned = false;
let remaining;
let soundOn = true;

const startBtn = document.getElementById("1500");
const shortBreakBtn = document.getElementById("300");
const longBreakBtn = document.getElementById("900");
const stopBtn = document.getElementById("stop");
const muteBtn = document.getElementById("mute-btn");
const backgroundBtn = document.getElementById("bg-btn");

// timer functionality

function timer(seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    clearInterval(countdown)
    remaining = seconds;   

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
        document.title = 'you did it!';
        if (soundOn){
            const sound = new Audio();
            sound.src = "./media/audio/alarm.wav"
            sound.play();
        }
    }
}

// start, stop & resume buttons

function startTimer() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
    hasRunned = true;
    stopBtn.firstChild.textContent = 'stop';
};

function startBreak() {
    const seconds = this.id;
    timer(seconds)
    isOn = true;
    hasRunned = true;
    stopBtn.firstChild.textContent = 'stop';
};

function stop() {
    clearInterval(countdown)
    stopBtn.firstChild.textContent = 'resume';
    isOn = false;
};

function resume() {
    stopBtn.firstChild.textContent = 'stop';
    isOn = true;
    timer(remaining)
};

startBtn.addEventListener('click', startTimer)
startBtn.addEventListener('click', function(){
    // random 'Just do it' sound on click;
    function randomJustDoItSounds(){
        const allFiles = ["just-do-it-1.wav", "just-do-it-2.wav", "just-do-it-3.wav", "just-do-it-4.wav", "do-it.wav", "do-it-1.wav", "do-it-2.wav", "dreams-be-dreams.wav", "nothing-is-impossible.wav", "yes-you-can.wav", "make-your-dreams.wav"]
        const randomNum = Math.floor(Math.random() * allFiles.length)
        return allFiles[randomNum];
    };
    if(soundOn){
        const justDoItSounds = new Audio();
        justDoItSounds.src = './media/audio/' + randomJustDoItSounds()
        justDoItSounds.play();
    }
});

shortBreakBtn.addEventListener('click', startBreak)

longBreakBtn.addEventListener('click', startBreak)

stopBtn.addEventListener('click', function() {

   if (!hasRunned){
        return;
   }
   
   if (isOn){
        stop()
        // random 'Stop' sound on click;
        function randomStopSounds(){
            const allFiles = ["not-gonna-stop-there.wav", "stop-giving-up.wav", "yesterday.wav"]
            const randomNum = Math.floor(Math.random() * allFiles.length)
            return allFiles[randomNum];
        };
        
        if(soundOn){
            const StopSounds = new Audio();
            StopSounds.src = './media/audio/' + randomStopSounds()
            StopSounds.play();
        }
    }
    else{
        resume();
    }
  });

// muting shia

muteBtn.addEventListener("click", muteSound)

function muteSound(){
    soundOn ? soundOn = false : soundOn = true;
    soundOn ? muteBtn.src = "./media/images/sound-on-icon.png" : muteBtn.src = "./media/images/mute-icon.png";
};

// changing background


let allBackgrounds = ['rgb(0, 255, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)']

function changeBackground() {
    
    let randomIndex = Math.floor(Math.random() * allBackgrounds.length);        
    let randomBackground = allBackgrounds[randomIndex];

    let elem = document.querySelector('body');
    let initialBg = getComputedStyle(elem).getPropertyValue('background-color')

    while(randomBackground === initialBg){
        randomIndex = Math.floor(Math.random() * allBackgrounds.length)
        randomBackground = allBackgrounds[randomIndex]
    }
    return document.body.style.backgroundColor = randomBackground;
};

backgroundBtn.addEventListener("click", changeBackground)


/* const backgrounds = new Image()
backgrounds.src = './media/images/bgs/' + changeBackground();
 */
