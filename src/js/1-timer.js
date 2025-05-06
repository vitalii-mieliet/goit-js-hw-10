import { iziToast, flatpickr, confirmDatePlugin } from './libs';

const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const daysEl = timer.querySelector('[data-days]');
const hoursEl = timer.querySelector('[data-hours]');
const minutesEl = timer.querySelector('[data-minutes]');
const secondsEl = timer.querySelector('[data-seconds]');

let userSelectedDate = null;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  plugins: [confirmDatePlugin({})],
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      console.log('Please choose a date in the future');
      if (!startBtn.hasAttribute('disabled')) {
        startBtn.setAttribute('disabled', '');
      }
      return;
    }
    startBtn.removeAttribute('disabled');
  },
});

startBtn.addEventListener('click', () => {
  countdownTimer();
  startBtn.setAttribute('disabled', '');
  dateInput.setAttribute('disabled', '');
});

function countdownTimer() {
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
    if (diff < 1000) {
      clearInterval(intervalId);
      startBtn.removeAttribute('disabled');
      dateInput.removeAttribute('disabled');
    }

    console.log(diff);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}
