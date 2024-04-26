// const $box = $('.box');
// $box.on('mouseenter', () => {
//   $box.style.willChange = 'transform';
// });
// $box.on('mouseleave', () => {});

// $box.on('click', () => {
//   $box.classList.toggle('move');
//   // $box.animate(
//   //   {
//   //     marginLeft: '500px',
//   //   },
//   //   500
//   // );
// });
//put box on it's own layer for moving and then back to main layer
const box = document.querySelector('.box');
box.addEventListener('mouseenter', () => {
  box.style.willChange = 'transform';
});
box.addEventListener('mouseleave', () => {
  box.style.willChange = 'auto';
});
box.addEventListener('transitionend', () => {
  box.style.willChange = 'auto';
});

box.addEventListener('click', () => {
  box.classList.toggle('move');
});
