let intervalID;
let messageTimer = document.getElementById("messageTimer");
let hoursTimer = document.getElementById("hoursTimer");
let minutesTimer = document.getElementById("minutesTimer");
let secondsTimer = document.getElementById("secondsTimer");
let hours = parseInt(hoursTimer.value);
let minutes = parseInt(minutesTimer.value);
let seconds = parseInt(secondsTimer.value);
let origHours = hours
let origMins = minutes
let origSeconds = seconds
let prevMinutes = null;
let prevSeconds = null;
let timerStarted = false;
let sound = new Audio("https://raw.githubusercontent.com/raul23/web-projects/main/projects/timer_bootstrap/audio/ding-ding-sound-effect.mp3");
let sound2 = sound.cloneNode(true);

function displaySeconds() {
  if (seconds < 10) {
      secondsTimer.value = "0" + seconds;
    }
    else {
      secondsTimer.value = seconds;
    }
}

function playSound2() {
    sound2.play();
}

function startTimer() {
  if (timerStarted) {
    return;
  }
  timerStarted = true;
  intervalID = setInterval(function(){
    hours = parseInt(hoursTimer.value);
    minutes = parseInt(minutesTimer.value);
    seconds = parseInt(secondsTimer.value);

    if (seconds > 59 || seconds < 0 || isNaN(seconds)) {
      s = seconds
      if(hours > 0 && minutes == 0) {
        seconds = 59
        prevSeconds = seconds
      }
      else {
      seconds = 0
      prevSeconds = seconds
      }

      if(s > 59) {
        seconds = 60
        prevSeconds = seconds
      }
      displaySeconds();
    }

    if (hours < 0 || isNaN(hours)) {
      hours = 0
      hoursTimer.value = hours;
    }

    if (minutes < 0 || isNaN(minutes)) {
      if(hours > 0) {
        hours-=1
        hoursTimer.value = hours;
        minutes = 60
        minutesTimer.value = minutes;
      }
      else {
      minutes = 0
      minutesTimer.value = minutes;
      }
    }
    if (seconds == 0) {
      seconds = 60;
      if (minutes == 0 && hours == 0) {
        resetTimer();
        sound.play();
        setTimeout(playSound2, 1000);
        return;
      }
      else {
        minutes -= 1;
        minutesTimer.value = minutes;
      }
    }

    if(minutes == 0 && seconds == 0) {
      hours-=1;
      hoursTimer.value = hours
      minutes = 59
      seconds = 59
      minutesTimer.value = minutes;
      secondsTimer.value = seconds;
    }
    seconds -= 1;
    prevMinutes = minutes;
    prevSeconds = seconds;
    displaySeconds();
  }, 1000);
  messageTimer.placeholder = "Timer started...";
}

function stopTimer(message=null) {
  timerStarted = false;
  clearInterval(intervalID);
  if (message) {
    messageTimer.placeholder = message;
  }
  else {
    messageTimer.placeholder = "Timer stopped!";
  }
  hours = hoursTimer.value;
  minutes = minutesTimer.value;
}

function resetTimer(message=null) {
  timerStarted = false;
  clearInterval(intervalID);
  if (message) {
    messageTimer.placeholder = message;
  }
  else {
    messageTimer.placeholder = "Timer resetted!";
  }
  hoursTimer.value = 10;
  minutesTimer.value = 10;
  secondsTimer.value = "10";
  hours = hoursTimer.value
  minutes = minutesTimer.value;
  seconds = 10;

  startTimer()
}