function findAll(value, array) {
  //start with empty array
  const result = [];
  // loop through array and find ones that match
  // if Object.is of eachother. If so, push them onto result
  for (let a of array) {
    if (Object.is(value, a)) {
      result.push(a);
      // if value is coercively equal to null and a is too push them
      // nulls and undefined are coercively equal to eachother
    } else if (value == null && a == null) {
      result.push(a);

      //allow strict matching to booleans
      // if both are booleans we can check against eachother
    } else if (typeof value == 'boolean' && typeof a == 'boolean') {
      if (value == a) {
        // === will do the same thing. both are booleans and if the same push them
        result.push(a);
      }
      // if value is a string and is not just white space
      // allow coercion if a is a number
      // then check for negative 0 on both.
    } else if (
      typeof value == 'string' &&
      value.trim() != '' &&
      typeof a == 'number' &&
      !Object.is(-0, a)
    ) {
      if (value == a) {
        result.push(a);
      }
      // check if value is a number and there are numbers we don't allow then allow
      // coercion from string to number
    } else if (
      typeof value == 'number' &&
      !Object.is(value, -0) &&
      !Object.is(value, NaN) &&
      !Object.is(value, Infinity) &&
      !Object.is(value, -Infinity) &&
      typeof a == 'string' &&
      a.trim() != ''
    ) {
      if (value == a) {
        result.push(a);
      }
    }
  }
  return result;
}

// tests:
var myObj = { a: 2 };

var values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  '',
  '0',
  '42',
  '42hello',
  'true',
  'NaN',
  true,
  false,
  myObj,
];

console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
console.log(setsMatch(findAll(0, values), [0, '0']) === true);
console.log(setsMatch(findAll(-0, values), [-0]) === true);
console.log(setsMatch(findAll(13, values), [13]) === true);
console.log(setsMatch(findAll(42, values), [42, '42']) === true);
console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll('', values), ['']) === true);
console.log(setsMatch(findAll('0', values), [0, '0']) === true);
console.log(setsMatch(findAll('42', values), [42, '42']) === true);
console.log(setsMatch(findAll('42hello', values), ['42hello']) === true);
console.log(setsMatch(findAll('true', values), ['true']) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(0, values), [0, -0]) === false);
console.log(setsMatch(findAll(42, values), [42, '42hello']) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(
  setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false
);
console.log(setsMatch(findAll('', values), ['', 0]) === false);
console.log(setsMatch(findAll('false', values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, 'true']) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);

// ***************************

function setsMatch(arr1, arr2) {
  if (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length == arr2.length
  ) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
