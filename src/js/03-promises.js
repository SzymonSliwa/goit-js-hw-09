const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    window.alert(`Please enter a positive number`);
  } else {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.error(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }

  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
