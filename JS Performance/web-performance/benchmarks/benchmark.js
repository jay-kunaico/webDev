const { performance } = require('perf_hooks');

// SETUP 🏁

// let iterations = 1e7;
let iterations = 100000;

// const a = 1;
// const b = 2;
class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const add = (x, y) => x + y;

// 🔚 SETUP

performance.mark('start');

// EXERCISE 💪

while (iterations--) {
  // add(a, b);
  const point = new Point(2, 4, 6);
  delete point.y;
  JSON.stringify(point);
}

// 🔚 EXERCISE

performance.mark('end');

performance.measure('My Special Benchmark', 'start', 'end');

const [measure] = performance.getEntriesByName('My Special Benchmark');
console.log(measure);
