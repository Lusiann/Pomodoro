const testoPomodoro = document.querySelector('#testoPomodoro')
const pomodoro = document.querySelector('.pomodoro')
const displayEndTime = document.querySelector('#PauseAt')
const pomodoroColore = document.querySelector('#colorpomodoro')
const testo = document.querySelectorAll('.testo')
const testoSecondi = document.querySelector('.secondi')
const testoMinuti = document.querySelector('.minuti')
const bottoneStart = document.querySelector('#startButton')
const bottonePausa = document.querySelector('#pauseButton')
let pausa = false;
let secondiPausa = 0;
/* let provaPercentuale */

function timer (seconds) {
    pausa = false;
    const now = Date.now()
    const then = now + seconds * 1000
    console.log((Date.now() - then) / 1000)
    displayTimeLeft(seconds)
    displayPause(then)    

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        secondiPausa = secondsLeft


        if(secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        if(pausa) {
            clearInterval(countdown)            
            return
        }

        displayTimeLeft(secondsLeft)
        colorPomodoro(seconds, secondsLeft)
        
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
    /* const display = `${minutes}:${secondiRimanenti < 10 ? '0' : '' }${secondiRimanenti}`
    testoPomodoro.firstChild.data = display;
    document.title = display; */
    testoMinuti.textContent = minutes;
    testoSecondi.textContent = `${secondiRimanenti < 10 ? '0' : '' }${secondiRimanenti}`;
    console.log(minutes, secondiRimanenti)
}


function displayPause(then) {
    const fine = new Date(then)
    const ore = fine.getHours()
    const minuti = fine.getMinutes()
    displayEndTime.textContent = `Pause at ${ore}:${minuti}`


}

function toggle() {
    if(pausa) {
        timer(secondiPausa)
        secondiPausa = 0;
    } else if (!pausa && secondiPausa > 0) {
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

let inputSeconds = 1500
testoPomodoro.addEventListener('input',function(e) {
    
    let minutes = testoMinuti.textContent
    let seconds = parseInt(testoSecondi.textContent) 
    let minutesToSeconds = minutes * 60
    inputSeconds = minutesToSeconds + (seconds ? seconds : 0)
    console.log(inputSeconds)
})

bottoneStart.addEventListener('click',function() {
    timer(inputSeconds)
})

bottonePausa.addEventListener('click', toggle)






