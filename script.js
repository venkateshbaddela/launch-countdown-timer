// "use strict";

const dayFrontTxt = document.querySelectorAll(".timer-day__front-txt");
const dayBackTxt = document.querySelectorAll(".timer-day__back-txt");
const hrsFrontTxt = document.querySelectorAll(".timer-hrs__front-txt");
const hrsBackTxt = document.querySelectorAll(".timer-hrs__back-txt");
const minFrontTxt = document.querySelectorAll(".timer-min__front-txt");
const minBackTxt = document.querySelectorAll(".timer-min__back-txt");
const secFrontTxt = document.querySelectorAll(".timer-sec__front-txt");
const secBackTxt = document.querySelectorAll(".timer-sec__back-txt");
const timer = document.querySelector(".timer-main");

const secFront = document.querySelectorAll(".timer-sec__front");
const minFront = document.querySelectorAll(".timer-min__front");
const hrsFront = document.querySelectorAll(".timer-hrs__front");
const dayFront = document.querySelectorAll(".timer-day__front");

const form = document.querySelector(".form");
const formWrapper = document.querySelector(".form-wrapper");
const formBtn = document.querySelector(".form-btn");
const dayInput = document.querySelector(".form-input__day");
const hrsInput = document.querySelector(".form-input__hrs");
const minInput = document.querySelector(".form-input__min");
const secInput = document.querySelector(".form-input__sec");

/* Defining timeout  and timeinterval  functions globally */
let animateTimeout, clockInterval;

/* Function to calculate time difference between now and deadline */
function getTimeRemaining(endtime) {
  const total = new Date(endtime).getTime() - new Date().getTime();
  const seconds = Math.round((total / 1000) % 60);

  const minutes = Math.floor((total / 1000 / 60) % 60);

  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

/* Function to calculate when days are double or triple digits */
const calcTime = function (time) {
  let outputTime;
  if (time.toString().length >= 1 && time.toString().length <= 2) {
    outputTime = ("0" + time).slice(-2);
  } else if (time.toString().length === 3) {
    outputTime = ("0" + time).slice(-3);
  }
  return outputTime;
};

/* Function to animate flipping cards */
const animate = function (topFlip, botFlip, topTime, botTime, time) {
  topFlip[0].style.animation = "cardTop .5s linear";
  botFlip[1].style.animation = "cardBot .5s linear ";

  animateDelay = setTimeout(() => {
    topFlip[0].style.animation = "";
    botFlip[1].style.animation = "";
    topTime[0].textContent = calcTime(time);
    botTime[1].textContent = calcTime(time);
  }, 500);
};

/* Function to update the timer */
function updateTimer(endtime) {
  const t = getTimeRemaining(endtime);
  if (t.seconds >= 0) {
    secBackTxt[0].textContent = calcTime(t.seconds);
    secFrontTxt[1].textContent = calcTime(t.seconds);
    animate(secFront, secFront, secFrontTxt, secBackTxt, t.seconds);
  }

  if (Number(minFrontTxt[0].textContent) !== t.minutes && t.minutes >= 0) {
    minBackTxt[0].textContent = calcTime(t.minutes);
    minFrontTxt[1].textContent = calcTime(t.minutes);
    animate(minFront, minFront, minFrontTxt, minBackTxt, t.minutes);
  }

  if (Number(hrsFrontTxt[0].textContent) !== t.hours && t.hours >= 0) {
    hrsBackTxt[0].textContent = calcTime(t.hours);
    hrsFrontTxt[1].textContent = calcTime(t.hours);
    animate(hrsFront, hrsFront, hrsFrontTxt, hrsBackTxt, t.hours);
  }

  if (Number(dayFrontTxt[0].textContent) !== t.days && t.days >= 0) {
    dayBackTxt[0].textContent = calcTime(t.days);
    dayFrontTxt[1].textContent = calcTime(t.days);
    animate(dayFront, dayFront, dayFrontTxt, dayBackTxt, t.days);
  }

  if (t.total <= 0) {
    clearInterval(clockInterval);
  }
}

/* Eventlistener to get the input deadline */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const day = Number(dayInput.value);
  const hour = Number(hrsInput.value);
  const minute = Number(minInput.value);
  const second = Number(secInput.value);

  const endTime = new Date(
    new Date().getTime() +
      day * 86400000 +
      hour * 3600000 +
      minute * 60000 +
      second * 1000
  ).toISOString();

  updateTimer(endTime);

  clockInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);

  /* Hide form when it is submitted */
  formWrapper.classList.add("hide-form");
});
