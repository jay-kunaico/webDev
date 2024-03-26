// CHALLENGE 1
function createFunction() {
  function sayHello() {
    console.log('hello');
  }
  return sayHello;
}

// /*** Uncomment these to check your work! ***/
const function1 = createFunction();
function1(); // => should console.log('hello');

// CHALLENGE 2
function createFunctionPrinter(input) {
  function printInput() {
    console.log('Challenge 2 input ', input);
  }
  return printInput;
}

// /*** Uncomment these to check your work! ***/
const printSample = createFunctionPrinter('sample');
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter('hello');
printHello(); // => should console.log('hello');

// CHALLENGE 3
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log('counter', counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// /*** Uncomment these to check your work! ***/
willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  function addInput(num) {
    let input = x;
    input += num;
    // console.log("challenge 3 ",input);
    return input;
  }
  return addInput;
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
addByTwo(1); // => should return 3
addByTwo(2); // => should return 4
addByTwo(3); // => should return 5

const addByThree = addByX(3);
addByThree(1); // => should return 4
addByThree(2); // => should return 5

const addByFour = addByX(4);
addByFour(4); // => should return 8
addByFour(5); // => should return 9

// CHALLENGE 4
function once(func) {
  let called = false;
  let result = 0;
  // console.log("once func ",func);
  return function (num) {
    if (!called) {
      called = true;
      result = func(num);
    }

    return result;
  };
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log('onceFunc ', onceFunc);
console.log('challenged 4 onceFunc ', onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

// CHALLENGE 5
function after(count, func) {
  let counter = 0;
  return function () {
    if (counter > count) {
      return func();
    }
  };
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log('hello');
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed
