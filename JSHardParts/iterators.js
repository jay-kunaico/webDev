// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// CHALLENGE 1

function sumFunc(arr) {
  // YOUR CODE HERE
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num += arr[i];
  }
  return num;
}

// Uncomment the lines below to test your work
const array = [1, 2, 3, 4];
console.log(sumFunc(array)); // -> should log 10

function returnIterator(arr) {
  // YOUR CODE HERE
  let index = 0;

  return function () {
    if (index < arr.length) {
      return arr[index++];
    } else {
      return undefined;
    }
  };
}

// Uncomment the lines below to test your work
const array2 = ['a', 'b', 'c', 'd'];
const myIterator = returnIterator(array2);
console.log(myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'

// CHALLENGE 2

function nextIterator(arr) {
  // YOUR CODE HERE
  let i = 0;

  const inner = {
    next: function () {
      const element = arr[i];
      i++;
      return element;
    },
  };
  return inner;
}

// Uncomment the lines below to test your work
const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

// CHALLENGE 3

function sumArray(arr) {
  // YOUR CODE HERE
  // use your nextIterator function
  const iterator = nextIterator(arr);
  let sum = 0;

  let value = iterator.next();
  while (value !== undefined) {
    sum += value;
    value = iterator.next();
  }

  return sum;
}

// Uncomment the lines below to test your work
const array4 = [1, 2, 3, 4];
console.log(sumArray(array4)); // -> should log 10

// CHALLENGE 4

function setIterator(set) {
  // YOUR CODE HERE
  let i = 0;
  const myArr = Array.from(set);

  const inner = {
    next: function () {
      const element = myArr[i];
      i++;
      return element;
    },
  };
  return inner;
}

// Uncomment the lines below to test your work
const mySet = new Set('hey');
const iterateSet = setIterator(mySet);
console.log(iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'

// CHALLENGE 5

function indexIterator(arr) {
  // YOUR CODE HERE
  let i = 0;

  const inner = {
    next: function () {
      const element = arr[i];
      i++;
      return i, element;
    },
  };
  return inner;
}

// Uncomment the lines below to test your work
const array5 = ['a', 'b', 'c', 'd'];
const iteratorWithIndex = indexIterator(array5);
console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

// CHALLENGE 6

function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function () {
  // YOUR CODE HERE
  const re = /\w+/g;
  let match;

  return {
    next: () => {
      match = re.exec(this.str);
      return {
        value: match ? match[0] : undefined,
        done: !match,
      };
    },
  };
};
// Uncomment the lines below to test your work
const helloWorld = new Words('Hello World');
for (let word of helloWorld) {
  console.log(word);
} // -> should log 'Hello' and 'World'

// CHALLENGE 7

function valueAndPrevIndex(arr) {
  let index = 0;

  return {
    sentence: function () {
      if (index === 0) {
        index++;
        return `${arr[0]} was found as the first element`;
      } else if (index < arr.length) {
        const sentence = `${arr[index]} was found after index ${index - 1}`;
        index++;
        return sentence;
      } else {
        return 'No more elements to iterate over';
      }
    },
  };
}

const returnedSentence = valueAndPrevIndex([4, 5, 6]);
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());

//CHALLENGE 8

function* createConversation(string) {
  if (string === 'english') {
    yield 'hello there';
  } else {
    yield 'gibberish';
  }

  setTimeout(() => createConversation(string), 3000);
}

console.log(createConversation('english').next());

//CHALLENGE 9
function waitForVerb(noun) {
  const verb = 'barks';
  return noun + ' ' + verb;
}

async function f(noun) {
  const sentence = waitForVerb(noun);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(sentence);
}

f('dog');
