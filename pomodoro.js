const testoPomodoro = document.querySelector('#testoPomodoro')
const pomodoro = document.querySelector('.pomodoro')
const displayEndTime = document.querySelector('#PauseAt')
const pomodoroColore = document.querySelector('#colorpomodoro')
const testo = document.querySelectorAll('.testo')
const testoSecondi = document.querySelector('.secondi')
const testoMinuti = document.querySelector('.minuti')
const bottoneStart = document.querySelector('#startButton')
const bottonePausa = document.querySelector('#pauseButton')
const bottoneReset = document.querySelector('#resetButton')
let pausa = true;
let timerIsGoing = false;
let secondiPausa = 0;
let inputSeconds = 1500;

/* let provaPercentuale */

function timer (seconds) {
    if(timerIsGoing) {
        return;
    }
    pausa = false;    
    const now = Date.now()
    const then = now + seconds * 1000
    console.log((Date.now() - then) / 1000)
    displayTimeLeft(seconds)
    displayPause(then)
    timerIsGoing = true;    

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        
        if(secondsLeft < 0) {
            clearInterval(countdown)
            timerIsGoing = false;
            document.title = 'Pomodoro Timer'            
            return
        }
        if(pausa) {
            clearInterval(countdown)
            timerIsGoing = false;            
            return
        }

        displayTimeLeft(secondsLeft)
        colorPomodoro(seconds, secondsLeft)        
        secondiPausa = secondsLeft
        inputSeconds = secondsLeft
        
    },1000)

}

function colorPomodoro(tempoCompleto, tempoRimanente ) {
    let provaPercentuale = 100 - (( tempoRimanente / tempoCompleto ) * 100)
    document.documentElement.style.setProperty('--pomodoroColore', provaPercentuale + '%')
    console.log(provaPercentuale)
    

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secondiRimanenti = seconds % 60    
    testoMinuti.textContent = minutes;
    testoSecondi.textContent = `${secondiRimanenti < 10 ? '0' : ' ' }${secondiRimanenti}`;
    //per display on title bar
    const display = `${minutes}:${secondiRimanenti < 10 ? '0' : ' ' }${secondiRimanenti}`
    document.title = display;
    
}


function displayPause(then) {
    const fine = new Date(then)
    const ore = fine.getHours()
    const minuti = fine.getMinutes()
    displayEndTime.textContent = `Pause at ${ore}:${minuti < 10 ? '0' : ' ' }${minuti}`

}

function toggle() {
    if(pausa && secondiPausa === 0) {
        timer(inputSeconds)
        return;
    }
    if(pausa) {       
            timer(secondiPausa)
            
        } else {
            pausa = true;
            displayEndTime.textContent = 'Pomodoro Paused'
        }
        
}

/* if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
 */
/* testoPomodoro.addEventListener('keypress',function(e) {
    let testo = this.innerText
    if (isNaN(String.fromCharCode(e.which))) e.preventDefault()
    if (testo.length === 6) e.preventDefault()
    if (testo.length === 0) testo = '25:00'   
    console.log(testo)

}) */

testo.forEach((text) => {
    text.addEventListener('keypress', function(e) {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault()        
    })
})


testoPomodoro.addEventListener('input',function(e) {

    let minutes = parseInt(testoMinuti.textContent)
    let seconds = parseInt(testoSecondi.textContent) 
    let minutesToSeconds = minutes * 60
    inputSeconds = minutesToSeconds + (seconds ? seconds : 0)
    
})


bottoneStart.addEventListener('click',function() {
    timer(inputSeconds)
    
})

bottonePausa.addEventListener('click', toggle)
bottoneReset.addEventListener('click', function() {
    
    inputSeconds = 1500    
    testoMinuti.textContent = '25'
    testoSecondi.textContent = '00'
    pausa = true;
    document.documentElement.style.setProperty('--pomodoroColore', '100%')
    displayEndTime.textContent = 'Hello'
    secondiPausa = 0;
    document.title = 'Pomodoro Timer'

})








