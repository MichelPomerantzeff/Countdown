const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const startButton = document.getElementById('playPause')
const btnSet = document.getElementById('set')

const upArrow = document.getElementById('increase')
const downArrow = document.getElementById('decrease')
const description = document.getElementById('description')

const increaseHour = document.getElementById('increaseHour')
const increaseMin = document.getElementById('increaseMin')
const increaseSec = document.getElementById('increaseSec')
const decreaseHour = document.getElementById('decreaseHour')
const decreaseMin = document.getElementById('decreaseMin')
const decreaseSec = document.getElementById('decreaseSec')

let intervalId = null

let displayTime = {
    seconds: seconds.innerHTML,
    minutes: minutes.innerHTML,
    hours: hours.innerHTML
}

function increase(time) {
    let a = parseFloat(time.innerHTML)
    a >= 59 ? a = 0 : a++
    time.innerHTML = a.toString().padStart(2, '0')

    if (time.id === "hours") {
        displayTime.hours = a
    } else if (time.id === "minutes") {
        displayTime.minutes = a
    } else if (time.id === "seconds") {
        displayTime.seconds = a
    }
}

function decrease(time) {
    let b = parseFloat(time.innerHTML)
    b > 0 ? b-- : b
    time.innerHTML = b.toString().padStart(2, '0')

    if (time.id === "hours") {
        displayTime.hours = b
    } else if (time.id === "minutes") {
        displayTime.minutes = b
    } else if (time.id === "seconds") {
        displayTime.seconds = b
    }
}

function updateTime() {
    seconds.textContent = displayTime.seconds.toString().padStart(2, '0')
    minutes.textContent = displayTime.minutes.toString().padStart(2, '0')
    hours.textContent = displayTime.hours.toString().padStart(2, '0')
    if (displayTime.hours == 0 && displayTime.minutes == 0 && displayTime.seconds == 0) {
        clearInterval(intervalId)
        updateButton()
    } else {
        countSeconds()
        if (displayTime.seconds < 0) {
            countMinutes()
            if (displayTime.minutes < 0) {
                countHours()
            }
        }
    }
}

const countSeconds = () => displayTime.seconds--

const countMinutes = () => {
    displayTime.minutes--
    displayTime.seconds = 59
}

const countHours = () => {
    displayTime.hours--
    displayTime.minutes = 59
}


function setTime() {
    if (startButton.innerHTML === "Start") {
        upArrow.classList.remove('hide')
        downArrow.classList.remove('hide')
        description.classList.add('hide')
    }
}


function playPause() {
    if (intervalId === null) {
        updateButton()
        intervalId = setInterval(updateTime, 1000)
    } else {
        updateButton()
        clearInterval(intervalId)
        intervalId = null
    }

    if (startButton.innerHTML === "Pause") {
        upArrow.classList.add('hide')
        downArrow.classList.add('hide')
        description.classList.remove('hide')
    }
}

const updateButton = () => {
    if (intervalId === null) {
        startButton.textContent = 'Pause'
        startButton.classList.remove('playPause')
        startButton.classList.add('stop')
    } else {
        startButton.innerHTML = 'Start'
        startButton.classList.remove('stop')
        startButton.classList.add('playPause')
    }
}

startButton.addEventListener('click', playPause)

btnSet.addEventListener('click', setTime)

increaseHour.addEventListener('click', () => increase(hours))
increaseMin.addEventListener('click', () => increase(minutes))
increaseSec.addEventListener('click', () => increase(seconds))

decreaseHour.addEventListener('click', () => decrease(hours))
decreaseMin.addEventListener('click', () => decrease(minutes))
decreaseSec.addEventListener('click', () => decrease(seconds))