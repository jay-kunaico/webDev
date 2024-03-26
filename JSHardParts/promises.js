// Challenge 1
function sayHello() {
  setTimeout(() => {
    console.log('Hellooo!');
  }, 1000);
}

// Uncomment the line below when ready
sayHello(); // should log "Hello" after 1000ms

// Challenge 2
var promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('Resolved!');
  }, 1500);
});

// Should print out "Resolved!"
promise.then((value) => {
  console.log(value);
});

// Challenge 3
promise = new Promise(function (resolve, reject) {
  reject('Rejected!');
});
// Should print out "Reject!"
promise.catch((value) => {
  console.log(value);
});

// Challenge 4
promise = new Promise(function (resolve, reject) {
  resolve();
});

// Uncomment the lines below when ready
promise.then(() => console.log('Promise has been resolved!'));
console.log("I'm not the promise!");

// Challenge 5
function delay() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// Uncomment the code below to test
// This code should log "Hello" after 1000ms
delay().then(sayHello);

// Challenge 6
var secondPromise = new Promise((resolve, reject) => {
  resolve('C6 Second!');
});
var firstPromise = new Promise((resolve, reject) => {
  resolve(secondPromise);
});

firstPromise.then((value) => {
  console.log(value);
});

// Challenge 7
const fakePeople = [
  { name: 'Rudolph', hasPets: false, currentTemp: 98.6 },
  { name: 'Zebulon', hasPets: true, currentTemp: 22.6 },
  { name: 'Harold', hasPets: true, currentTemp: 98.3 },
];

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: 'index out of range' });
    }
  });
};

function getAllData() {
  const promises = fakePeople.map((person, index) => fakeAPICall(index));
  return Promise.all(promises);
}

getAllData().then((data) => {
  data.forEach((item) => {
    console.log(item);
  });
});
