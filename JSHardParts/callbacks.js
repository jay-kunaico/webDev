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
console.log(
  'Challenge 8 ',
  union([
    [5, 10, 15],
    [15, 88, 1, 5, 7],
    [100, 15, 10, 1, 5],
  ])
);
// should log: [5, 10, 15, 88, 1, 7, 100]

// Challenge 9
function objOfMatches(array1, array2, callback) {
  const myObj = {};
  // objOfMatches will test each element of the first array using the callback
  array1.forEach((element, index) => {
    const matched = callback(element);
    //to see if the output matches the corresponding element (by index) of the second array
    if (matched === array2[index]) {
      myObj[element] = array2[index];
    }
  });

  return myObj;
}

console.log(
  objOfMatches(
    ['hi', 'howdy', 'bye', 'later', 'hello'],
    ['HI', 'Howdy', 'BYE', 'LATER', 'hello'],
    function (str) {
      return str.toUpperCase();
    }
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

// Challenge 10
function multiMap(arrVals, arrCallbacks) {
  const myObj = {};
  //multiMap will return an object whose keys match the elements in the array of values.
  arrVals.forEach((value) => {
    //The corresponding values that are assigned to the keys will be arrays consisting of outputs from the array of callbacks, where the input to each callback is the key.
    myObj[value] = arrCallbacks.map((callback) => callback(value));
  });

  return myObj;
}

console.log(
  multiMap(
    ['catfood', 'glue', 'beer'],
    [
      function (str) {
        return str.toUpperCase();
      },
      function (str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
      },
      function (str) {
        return str + str;
      },
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Challenge 11
function objectFilter(obj, callback) {
  //objectFilter will return a new object.
  const myObj = {};
  //The new object will contain only the properties from the input object such that the property's value is equal to the property's key passed into the callback.
  for (const key in obj) {
    // check the value is === to the key passed into the callback so pass the key to the callback
    if (callback(key) === obj[key]) {
      // add that to the returnable obj
      myObj[key] = obj[key];
    }
  }

  return myObj;
}

const cities = {
  London: 'LONDON',
  LA: 'Los Angeles',
  Paris: 'PARIS',
};
console.log(objectFilter(cities, (city) => city.toUpperCase()));
// Should log { London: 'LONDON', Paris: 'PARIS'}

// Challenge 12
function majority(array, callback) {
  let majorityIsTrue = false;
  let numberTrue = 0;
  let numberFalse = 0;
  // majority will iterate through the array and perform the callback on each element
  array.forEach((element) => {
    //until it can be determined if the majority of the return values from the callback are true.
    if (callback(element)) {
      numberTrue++;
    } else {
      numberFalse++;
    }
  });
  return (majorityIsTrue = numberTrue > numberFalse);
}

// /*** Uncomment these to check your work! ***/
const isOdd = function (num) {
  return num % 2 === 1;
};
console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
console.log(majority([2, 3, 4, 5], isOdd)); // should log: false

// Challenge 13
function prioritize(array, callback) {
  const trueValues = [];
  const falseValues = [];
  array.forEach((element) => {
    //separate elements based on the return value of the callback function.
    if (callback(element)) {
      // true elements added to the true array
      trueValues.push(element);
    } else {
      // false values added to the false
      falseValues.push(element);
    }
  });
  //a new array by concatenating trueValues and falseValues, ensuring that elements that yielded true come first in the array.
  return [...trueValues, ...falseValues];
}

// /*** Uncomment these to check your work! ***/
const startsWithS = function (str) {
  return str[0] === 's' || str[0] === 'S';
};
console.log(
  prioritize(
    ['curb', 'rickandmorty', 'seinfeld', 'sunny', 'friends'],
    startsWithS
  )
);
// should log:
['seinfeld', 'sunny', 'curb', 'rickandmorty', 'friends'];

// Challenge 14
function countBy(array, callback) {
  //use the reduce method to iterate through the input array.
  return array.reduce((acc, current) => {
    const key = callback(current);
    //use the return value of the callback as a key in the accumulator object
    //increment the value associated with that key to count the number of times that return value was returned
    acc[key] = (acc[key] || 0) + 1;
    // return the accumulator containg the count for each value
    return acc;
  }, {});
}

// /*** Uncomment these to check your work! ***/
console.log(
  countBy([1, 2, 3, 4, 5], function (num) {
    if (num % 2 === 0) return 'even';
    else return 'odd';
  })
); // should log: { odd: 3, even: 2 }

// Challenge 15
function groupBy(array, callback) {
  // use reduce to iterate through array
  return array.reduce((acc, current) => {
    // use return value from callback as key in acc
    const key = callback(current);
    // if not key make an empty array
    if (!acc[key]) {
      acc[key] = [];
    }
    // push current element into array with the key
    acc[key].push(current);
    // return acc with elements groubed by return value
    return acc;
  }, {});
}

/*** Uncomment these to check your work! ***/
const decimals = [1.3, 2.1, 2.4];
const floored = function (num) {
  return Math.floor(num);
};
console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }

// Challenge 16
function goodKeys(obj, callback) {
  const keys = [];
  for (const key in obj) {
    //check if the callback function returns true when called with the corresponding value from the object.
    if (callback(obj[key])) {
      //If the callback returns true, it includes the key in the filtered array.
      keys.push(key);
    }
  }
  //Finally, it returns an array of keys whose associated values yielded a true return value from the callback.
  return keys;
}

/*** Uncomment these to check your work! ***/
const sunny = {
  mac: 'priest',
  dennis: 'calculating',
  charlie: 'birdlaw',
  dee: 'bird',
  frank: 'warthog',
};
const startsWithBird = function (str) {
  return str.slice(0, 4).toLowerCase() === 'bird';
};
console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']

// Challenge 17
function commutative(func1, func2, value) {
  const firstResult = func1(func2(value));
  const secondResult = func2(func1(value));
  return firstResult === secondResult;
}

/*** Uncomment these to check your work! ***/
const multBy3 = (n) => n * 3;
const divBy4 = (n) => n / 4;
const subtract5 = (n) => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false

// Challenge 18
function objFilter(obj, callback) {
  const filteredObject = {};
  for (const key in obj) {
    if (callback(key) === obj[key]) {
      filteredObject[key] = obj[key];
    }
  }
  return filteredObject;
}

/*** Uncomment these to check your work! ***/
const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n) => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Challenge 19
function rating(arrOfFuncs, value) {
  const trueCount = arrOfFuncs.filter((func) => func(value)).length;
  return (trueCount / arrOfFuncs.length) * 100;
}

/*** Uncomment these to check your work! ***/
const isEven = (n) => n % 2 === 0;
const greaterThanFour = (n) => n > 4;
const isSquare = (n) => Math.sqrt(n) % 1 === 0;
const hasSix = (n) => n.toString().includes('6');
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75

// Challenge 20
function pipe(arrOfFuncs, value) {
  return arrOfFuncs.reduce((acc, func) => func(acc), value);
}

/*** Uncomment these to check your work! ***/
const capitalize = (str) => str.toUpperCase();
const addLowerCase = (str) => str + str.toLowerCase();
const repeat = (str) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.l;
