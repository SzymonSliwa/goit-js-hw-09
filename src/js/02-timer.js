const log = console.log.bind();

const btn = document.querySelector('button');

btn.disabled = true;

const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');
let value = null;

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (selectedDates[0].getTime() < currentTime) {
      window.alert('Please choose a date in the future');
      btn.disabled = true;
    } else {
      btn.disabled = false;

      let ms = selectedDates[0].getTime() - currentTime;

      const onBtnClick = () => {
        timerId = setInterval(() => {
          if (ms > 1000) {
            ms = ms - 1000;

            const convertedMs = convertMs(ms);
            daysCounter.innerHTML = addLeadingZero(convertedMs.days.toString());
            hoursCounter.innerHTML = addLeadingZero(
              convertedMs.hours.toString()
            );
            minutesCounter.innerHTML = addLeadingZero(
              convertedMs.minutes.toString()
            );
            secondsCounter.innerHTML = addLeadingZero(
              convertedMs.seconds.toString()
            );
            btn.disabled = true;
          }
        }, 1000);
      };

      btn.addEventListener('click', onBtnClick);

      const convertedMs = convertMs(ms);

      daysCounter.innerHTML = addLeadingZero(convertedMs.days.toString());
      hoursCounter.innerHTML = addLeadingZero(convertedMs.hours.toString());
      minutesCounter.innerHTML = addLeadingZero(convertedMs.minutes.toString());
      secondsCounter.innerHTML = addLeadingZero(convertedMs.seconds.toString());
    }
  },
};

flatpickr('#datetime-picker', options);

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

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
