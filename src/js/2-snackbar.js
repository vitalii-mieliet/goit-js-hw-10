import { iziToast } from './libs';

const form = document.querySelector('.js-form');

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(value =>
      iziToast.success({
        position: 'topRight',
        message: `Fulfilled promise in ${value}ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        position: 'topRight',
        message: `Rejected promise in ${value}ms`,
      })
    )
    .finally(() => form.reset());
}

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
  return promise;
}
