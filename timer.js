function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  
  const deadline = new Date(Date.parse(new Date()) + 1 * 1 * 1 * 1 * 1000); // change deadlin

  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        //clearInterval(timeinterval);
        deadline = new Date(Date.parse(new Date()) + 1 * 1 * 1 * 12 * 1000); // change deadline
      }
    }
  
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  initializeClock('clockdiv', deadline);

// RESET TIMER
// RUN TIMER IN BG (ONCE THE TAB IS OPENED -> GET CURRENT TIME VS WHEN THE TIMER STARTED (STORE IN A COOKIE) ->
// SUBTRACT CURRENT TIME-WHEN THE TIMER STARTED)