let intervalID;
let messageTimer = document.getElementById("messageTimer");
let hoursTimer = document.getElementById("hoursTimer");
let minutesTimer = document.getElementById("minutesTimer");
let secondsTimer = document.getElementById("secondsTimer");
let hours = parseInt(hoursTimer.value);
let minutes = parseInt(minutesTimer.value);
let seconds = parseInt(secondsTimer.value);
let prevMinutes = null;
let prevSeconds = null;
let timerStarted = false;
let sound = new Audio("https://raw.githubusercontent.com/raul23/web-projects/main/projects/timer_bootstrap/audio/ding-ding-sound-effect.mp3");
let sound2 = sound.cloneNode(true);

let api = "Frequent"; // pull here (frequent or average etc.)

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
  const userEmail = document.getElementById("email").value;
  const plant = document.getElementById("plantName").value;
  timerStarted = true;
  intervalID = setInterval(function () {
    hours = parseInt(hoursTimer.value);
    minutes = parseInt(minutesTimer.value);
    seconds = parseInt(secondsTimer.value);

    if (seconds > 59 || seconds < 0 || isNaN(seconds)) {
      s = seconds
      if (hours > 0 && minutes == 0) {
        seconds = 59
        prevSeconds = seconds
      }
      else {
        seconds = 0
        prevSeconds = seconds
      }

      if (s > 59) {
        seconds = 59
        prevSeconds = seconds
      }
      displaySeconds();
    }

    if (hours < 0 || isNaN(hours)) {
      hours = 0
      hoursTimer.value = hours;
    }

    if (seconds == 0) {
      seconds = 59;
      if (minutes == 0 && hours == 0) {
        Email.send({
          SecureToken: "c4f1c637-a2d7-4e55-bca5-69c332445b6e",
          To: userEmail,
          From: "plantproo@gmail.com",
          Subject: "Don't forget to water your plant!",
          Body: "Hey! Your " + plant + " is ready to be watered!"
        }).then(
          message => alert("Timer Done, Reminder Email Sent!")
        );
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

    if (minutes < 0 || isNaN(minutes)) {
      if (hours > 0) {
        hours -= 1
        hoursTimer.value = hours;
        minutes = 59
        minutesTimer.value = minutes;
      }
      else {
        minutes = 0
        minutesTimer.value = minutes;
      }
    }

    if (minutes == 0 && seconds == 0) {
      hours -= 1;
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

function stopTimer(message = null) {
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

function resetTimer(message = null) {
  timerStarted = false;
  clearInterval(intervalID);
  if (message) {
    messageTimer.placeholder = message;
  }
  else {
    messageTimer.placeholder = "Timer resetted!";
  }

  if (api = "Frequent") {
    hoursTimer.value = 1;
    minutesTimer.value = 0;
    secondsTimer.value = "0";
  }
  else if (api = "Average") {
    hoursTimer.value = 3;
    minutesTimer.value = 0;
    secondsTimer.value = "0";
  }
  else if (api = "Little") {
    hoursTimer.value = 5;
    minutesTimer.value = 0;
    secondsTimer.value = "0";
  }

  // add more api types (ie: less frequent etc.) and change values if needed

  hours = hoursTimer.value
  minutes = minutesTimer.value;
  seconds = 0; // change value of seconds here if needed here too (and above with secondTimer.value)

  startTimer()
}