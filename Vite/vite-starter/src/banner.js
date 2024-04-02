import { bannerText } from './banner.module.css';

export const addBanner = (text) => {
  const container = document.querySelector('#content');
  container.classList.add(bannerText);
  container.textContent = text;
};

export const removeBanner = () => {
  const container = document.querySelector('#content');
  container.textContent = '';
  container.classList.remove('bannerText');
};
