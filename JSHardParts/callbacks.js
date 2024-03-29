// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// Challenge 1
function addTwo(num) {
  return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log('c1 ', addTwo(3));
console.log('c1 ', addTwo(10));

// Challenge 2
function addS(word) {
  return word + 's';
}

// uncomment these to check your work
console.log('c2 ', addS('pizza'));
console.log('c2 ', addS('bagel'));

// Challenge 3
function map(array, callback) {
  // const output = [];
  // for(let i=0;i< array.length; i++) {
  // output.push(callback(array[i]));
  // }

  // try again
  // const output = array.map(item => callback(item));
  // return output;

  // I think the below is good.
  return array.map((item) => callback(item));
}

console.log('Challenge 3 map ', map([1, 2, 3], addTwo));

// Challenge 4
function forEach(array, callback) {
  // const result = []; // added in Challenge5
  // console.log('challenge4 array ',array);
  // for(let i=0;i< array.length; i++) {
  // 	result.push(callback(array[i])); // added in Challenge5
  //   console.log("challenge4 forEach func ",callback(array[i]));
  // }
  // return result; // added in Challenge5
  ////////////////////////////////////////////////////////////////
  // Reworked Challenge 5 so I can use this now
  array.forEach((element) => {
    callback(element);
    // console.log("Challenge 4 element ",callback(element));
  });
}
forEach([1, 2, 3], addTwo);

// see for yourself if your forEach works!

// Challenge 5
function mapWith(array, callback) {
  // return forEach(array,callback);
  // above needed elements added to Challenge4
  const result = [];
  forEach(array, (element) => {
    result.push(callback(element));
  });
  // array.forEach(element => {
  //   result.push(callback(element));
  // });
  return result;
}
const challenge5 = mapWith([10, 20, 30], addTwo);
console.log('challenge 5 result ', challenge5);

// Challenge 6
function reduce(array, callback, initialValue) {
  let accumulator = initialValue;
  // for each element in the array set the accumulator to
  // the result of the callback on it
  // for(let i = 0; i < array.length; i++){
  //   accumulator = callback(accumulator,array[i]);
  // }
  array.forEach((element) => (accumulator = callback(accumulator, element)));

  return accumulator;
}
const nums = [4, 1, 3];
const add = function (a, b) {
  return a + b;
};
// console.log("C6 ", reduce(nums, add, 0));
console.log('C6 ', reduce([5, 6, 7], add, 0));
// Arrays have a builtin for this
const sum = nums.reduce((acc, current) => {
  return acc + current;
}, 0);
console.log('builtin accumulator ', sum);

// Challenge 7
function intersection(arrays) {
  //create a new array by filtering out items that are not in both
  // use reduce to iterate over each currentArray in arrays
  // this way works too but I refactored it below
  // return arrays.reduce((intersectArray, currentArray) => {
  // use filter to check if the current element is in intersectArray
  // keep only values that are also present in currentArray .includes
  //   return intersectArray.filter((element) => currentArray.includes(element));
  // });
  let result = [];
  arrays.forEach((currentArray, index) => {
    // set result to the firt array as a baseline to compare to
    if (index === 0) {
      result = currentArray;
    } else {
      // call reduce from above passing array, callback and initifalValue
      result = reduce(
        currentArray,
        (intersection, element) => {
          // look for the element in the result and add it because we are looking for
          // elements found in all of the arrays
          if (result.includes(element)) {
            intersection.push(element);
          }
          return intersection;
          // initialValue
        },
        []
      );
    }
  });
  return result;
}

console.log(
  intersection([
    [5, 10, 15, 20],
    [15, 88, 1, 5, 7],
    [1, 10, 15, 5, 20],
  ])
);
// should log: [5, 15]

// Challenge 8
function union(arrays) {
  // return arrays.reduce((intersectArray, currentArray) => {
  //   currentArray.forEach((element) => {
  //     if (!intersectArray.includes(element)) {
  //       intersectArray.push(element);
  //     }
  //   });
  //   return intersectArray;
  // REFACTORED
  return reduce(
    arrays,
    (acc, currentArray) => {
      currentArray.forEach((element) => {
        if (!acc.includes(element)) {
          acc.push(element);
        }
      });
      return acc;
    },
    []
  );
}
ddc;
console.log(
  'Challenge 8 ',
  union([
    [5, 10, 15],
    [15, 88, 1, 5, 7],
    [100, 15, 10, 1, 5],
  ])
);
// should log: [5, 10, 15, 88, 1, 7, 100]
