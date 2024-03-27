// if Object.is has been defined (it's a function)
if (!Object.is /*|| true*/) {
  // Define our own version of Object.is
  // the job of Object.is is === and not lie in cases of -0
  Object.is = function ObjectIs(x, y) {
    // check if x or y are -0, need to set each separetly first
    var xNegZero = isNegativeZero(x);
    var yNegZero = isNegativeZero(y);

    // if either are -0.  Both could be -0
    if (xNegZero || yNegZero) {
      // true only if both ar -0
      return xNegZero && yNegZero;

      // test if it is NaN. x && y
    } else if (isNaN(x) && isNaN(y)) {
      return true;
      // defer to ===
    } else if (x === y) {
      return true;
    }
    return false;

    // define function to check for -0
    function isNegativeZero(a) {
      // could use == also
      return a === 0 && 1 / a === -Infinity;
    }

    // define NaN function to check
    function isNaN(b) {
      // NaN is not equal to itself
      return b !== b;
    }
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
