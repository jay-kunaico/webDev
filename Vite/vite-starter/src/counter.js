import { addBanner } from './banner.js';
import styles from './counter.module.css';

export const initializeCounter = (doc = globalThis.document) => {
  const countElement = doc.getElementById('count');
  const incrementButton = doc.getElementById('increment');
  const decrementButton = doc.getElementById('decrement');

  countElement.classList.add(styles.count);
  let count = 0;
  let bannerAdded = false;

  const render = () => {
    countElement.textContent = count;
    if (count < 0) {
      import('./banner.js').then(({ addBanner }) => {
        addBanner('The counter is negative!');
        bannerAdded = true;
      });
    } else if (count >= 0 && bannerAdded) {
      import('./banner.js').then(({ removeBanner }) => {
        removeBanner();
        bannerAdded = false;
      });
    }
  };

  const increment = () => {
    count++;
    render();
  };

  const decrement = () => {
    count--;
    render();
  };

  incrementButton.addEventListener('click', increment);
  decrementButton.addEventListener('click', decrement);

  render();

  return () => {
    incrementButton.removeEventListener('click', increment);
    decrementButton.removeEventListener('click', decrement);
  };
};
