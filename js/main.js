let countdown;
let isOn = false;
let hasRunned = false;
let remaining;

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

const startBtn = document.getElementById("1500");
const shortBreakBtn = document.getElementById("300");
const longBreakBtn = document.getElementById("900");
const stopBtn = document.getElementById("stop");

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

const muteBtn = document.getElementById("mute-btn");
let soundOn = true;

muteBtn.addEventListener("click", muteSound)

function muteSound(){
    soundOn ? soundOn = false : soundOn = true;
    soundOn ? muteBtn.src = "./media/images/sound-on-icon.png" : muteBtn.src = "./media/images/mute-icon.png";
};

// changing background

const backgroundBtn = document.getElementById("bg-btn");
backgroundBtn.addEventListener("click", changeBackground)

let allBackgrounds = ["url('./media/images/bgs/ed.jpg')", "url('./media/images/bgs/haka.jpg')", "url('./media/images/bgs/cat.jpg')", "url('./media/images/bgs/mosh.jpg')", "url('./media/images/bgs/bodybuilders.jpg')", "url('./media/images/bgs/meerkats.jpg')", "url('./media/images/bgs/party.jpg')", "url('./media/images/bgs/wedding.jpg')", "url('./media/images/bgs/photogenic.jpg')", "url('./media/images/bgs/space.jpg')", "url('./media/images/bgs/bathroom.jpg')"]

function changeBackground() {
    
    document.body.style.backgroundImage = allBackgrounds.pop();
    allBackgrounds.splice(0, 0, document.body.style.backgroundImage)

    /* BY ORDER:

        document.body.style.backgroundColor = allBackgrounds.pop()
        allBackgrounds.splice(0, 0, document.body.style.backgroundColor) */

    /* RANDOMIC:

    let randomIndex = Math.floor(Math.random() * allBackgrounds.length);        
    let randomBackground = allBackgrounds[randomIndex];

    while(randomBackground === initialBg){
        randomIndex = Math.floor(Math.random() * allBackgrounds.length)
        randomBackground = allBackgrounds[randomIndex]
    }
    return document.body.style.backgroundColor = randomBackground; */
};

// chancing background for mobile

const backgroundBtnMob = document.getElementById("bg-btn-mob");
backgroundBtnMob.addEventListener("click", changeBackgroundMob)

let allBackgroundsMob = ["url('./media/images/bgs-mob/ed.jpg')", "url('./media/images/bgs-mob/cat.jpg')", "url('./media/images/bgs-mob/eiffel.jpg')", "url('./media/images/bgs-mob/meerkats.jpg')", "url('./media/images/bgs-mob/space.jpg')"]

function changeBackgroundMob() {
    document.body.style.backgroundImage = allBackgroundsMob.pop();
    allBackgroundsMob.splice(0, 0, document.body.style.backgroundImage)
};

// follow the cursor

let eyesElement = document.getElementsByClassName("eyeballs");

document.onmousemove = function () {
    let x = event.clientX * 100 / window.innerWidth + "%";
    let y = event.clientY * 100 / window.innerHeight + "%";

    for(i = 0; i < 2; i++){
 
        eyesElement[i].style.left = x;
        eyesElement[i].style.top = y;
        eyesElement[i].style.transform = "translate(-"+x+",-"+y+")";
    }
};





