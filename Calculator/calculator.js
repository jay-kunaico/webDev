let cache = '0';
let subTotal = 0;
let previousSymbol = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (cache === '0') {
    cache = number;
  } else {
    cache += number;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      cache = '0';
      subTotal = 0;
      break;
    case '=':
      if (previousSymbol === null) {
        return;
      }
      flushCache(parseInt(cache));
      previousSymbol = null;
      cache = subTotal;
      subTotal = 0;
      break;
    case '←':
      if (cache.length === 1) {
        cache = '0';
      } else {
        cache = cache.substring(0, cache.length - 1);
      }
      break;
    case '÷':
      handleMath(symbol);
      break;
    case '×':
      handleMath(symbol);
      break;
    case '-':
      handleMath(symbol);
      break;
    case '+':
      handleMath(symbol);
      break;
  }
}

function handleMath(value) {
  if (cache === '0') {
    return;
  }
  const intCache = parseInt(cache);
  if (subTotal === 0) {
    subTotal = intCache;
  } else {
    flushCache(intCache);
  }
  previousSymbol = value;
  cache = '0';
}
function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  screen.innerText = cache;
}

function flushCache(intCache) {
  if (previousSymbol === '+') {
    subTotal += intCache;
  } else if (previousSymbol === '-') {
    subTotal -= intCache;
  } else if (previousSymbol === '×') {
    subTotal *= intCache;
  } else if (previousSymbol === '÷') {
    subTotal /= intCache;
  }
}
init();
