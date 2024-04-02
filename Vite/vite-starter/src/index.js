// import { initializeCounter } from './counter';

// console.log('Hello World!');

// document.querySelector('h2').textContent = 'Hello World!';

// initializeCounter();

import image from './steve-after-a-workshop.jpg?h=400&format=webp';
const img = document.createElement('img');
img.src = image;
// img.style = 'width: 200px';
img.width = 200;

document.querySelector('#content').appendChild(img);
import('./counter').then(({ initializeCounter }) => {
  initializeCounter();
});

// add globs everything under logos
const content = document.querySelector('#content');
// console.log(import.meta.glob('./logos/**/*.svg', { eager: true }));

for (const [path, module] of Object.entries(
  import.meta.glob('./logos/**/*.svg'),
)) {
  module().then((url) => {
    const img = document.createElement('img');
    img.src = url.default;
    img.height = 100;
    content.appendChild(img);
  });
}
