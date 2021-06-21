let oneMinuteInterval
let countDownInterval
let fiveMinutesFromNowInSeconds
let alreadyRunning = false
const popup = '#session-timeout-popup'

function initModal() {
    $(popup).modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    })
}

(function() {
    if ($('nav.navbar').is(':visible')){
        initModal()
        startTimer()
    }
}())

function startTimer() {
    oneMinuteInterval = setInterval(noUserAction, 60 * 1000)
    localStorage.setItem('timestamp', new Date().getTime().toString())
}

function startCountTimeTimer() {
    alreadyRunning = true
    fiveMinutesFromNowInSeconds = 300
    countDownInterval = setInterval(countDown, 1000)
}

function showPopup() {
    if (!alreadyRunning) {
        $(popup).modal('show')
        $(popup + ' #counter').html("05:00")
        startCountTimeTimer()
    }
}

function countDown() {
    fiveMinutesFromNowInSeconds--
    let seconds = fiveMinutesFromNowInSeconds % 60
    let formatSeconds = seconds < 10 ? '0' + seconds : '' + seconds
    let minutes = '0' + Math.floor( (fiveMinutesFromNowInSeconds) / 60)
    $(popup + ' #counter').html(minutes + ":" + formatSeconds)

    if (fiveMinutesFromNowInSeconds <= 0) {
        resetTimer()
        resetCountDownTimer()
        logUserOut()
    }
}

function resetCountDownTimer() {
    clearInterval(countDownInterval)
    alreadyRunning = false
}

function resetTimer() {
    clearInterval(oneMinuteInterval)
    startTimer()
}

function logUserOut() {
    localStorage.clear()
    location.href = location.origin + '/pages/logout'
}

function noUserAction() {
    const now = new Date().getTime()
    const startTime = localStorage.getItem('timestamp')
    if (now - startTime >= (25 * 60 * 1000)) {
        showPopup()
    }
}

$(popup + ' .btn').on('click', function() {
    $(popup).modal('hide')
    resetTimer()
    resetCountDownTimer()
})

$('.container, .navbar').on('click', function() {
    if ($('nav.navbar').is(':visible')){
        resetTimer()
    }
})
