const btnPlayPause = document.getElementById('playPause')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const btnSet = document.getElementById('set')

const countSeconds = () => startingTime.seconds --

const countMinutes = () => {
    startingTime.minutes --
    startingTime.seconds = 59
}

const countHours = () => {
    startingTime.hours --
    startingTime.minutes = 59
}

let intervalId = null

function playPause() {
    if(intervalId === null) {
        updateButton()
        intervalId = setInterval(updateTime, 1000)
    } else {
        updateButton()
        clearInterval(intervalId)
        intervalId = null
    }
}

let startingTime = {
    seconds: 0,
    minutes: 0,
    hours: 0
}

btnPlayPause.addEventListener('click', playPause)

btnSet.addEventListener('click', () => {
    playPause()
    const hour = prompt('Enter hours:')
    startingTime.hours = hour
    const mins = prompt('Enter minutes:')
    startingTime.minutes = mins
    const secs = prompt('Enter seconds:')
    startingTime.seconds = secs
})

const updateTime = () => {
    seconds.textContent = startingTime.seconds.toString().padStart(2,'0')
    minutes.textContent = startingTime.minutes.toString().padStart(2,'0')
    hours.textContent = startingTime.hours.toString().padStart(2,'0')
    if(startingTime.hours == 0 && startingTime.minutes == 0 && startingTime.seconds == 0) {
        clearInterval(intervalId)
        updateButton()
    } else {
        countSeconds()
        if(startingTime.seconds < 0) {
            countMinutes()
            if(startingTime.minutes < 0) {
                countHours()
            }
        }
    }
}

const updateButton = () => {
    if(intervalId === null) {
        btnPlayPause.textContent = 'Pause'
        btnPlayPause.classList.remove('playPause')
        btnPlayPause.classList.add('stop')
    } else {
        btnPlayPause.innerHTML = 'Start'
        btnPlayPause.classList.remove('stop')
        btnPlayPause.classList.add('playPause')
    }
}
