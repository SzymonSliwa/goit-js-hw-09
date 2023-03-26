const log = console.log.bind();

const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

const onBtnStartClick = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
};

const onBtnStopClick = () => {
  clearInterval(timerId);
  btnStart.disabled = false;
};

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
