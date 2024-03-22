const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;
const ROUNDS = 6;
async function init() {
  let currentGuess = '';
  let currentRow = 0;
  let isLoading = true;
  let done = false;

  //https://words.dev-apis.com/word-of-the-day?random=1 to get a new word every time.
  const res = await fetch(
    'https://words.dev-apis.com/word-of-the-day?random=1'
  );
  const resObj = await res.json(); // now we have the wod of the day
  // could also do const {word} = await res.json() if we knew that the response had "word"  = destructuring
  const word = resObj.word.toUpperCase();
  const wordLetters = word.split('');

  setLoading(isLoading);
  isLoading = false;
  console.log(word);

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      // replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }
  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      //do nothing
      return;
    }

    // TODO validate the word
    isLoading = true;
    setLoading(isLoading);
    const res = await fetch('https://words.dev-apis.com/validate-word', {
      method: 'POST',
      body: JSON.stringify({ word: currentGuess }), // post to the API and validate letters make a word
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const {validWor} =  resObj; // a little cryptic but the same as the line above
    isLoading = false;
    setLoading(isLoading);

    // not valid, mark the word as invalid and return
    if (!validWord) {
      markInvalidWord();
      return;
    }

    // TODO do all the marking as "correct" "close" or "wrong"
    const guessLetter = currentGuess.split('');
    const map = makeMap(wordLetters);
    let allRight = true;

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessLetter[i] === wordLetters[i]) {
        // mark it gree "correct"
        letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
        map[guessLetter[i]]--;
      }
    }

    // second pass finds close and wrong letters
    // we use the map to make sure we mark the correct amount of
    // close letters
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessLetter[i] === wordLetters[i]) {
        // do nothing
      } else if (map[guessLetter[i]] && map[guessLetter[i]] > 0) {
        // mark as close
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
        map[guessLetter[i]]--;
      } else {
        // wrong
        allRight = false;
        letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
      }
    }

    currentRow++;

    if (allRight) {
      alert('You WIN!');
      document.querySelector('.brand').classList.add('winner');
      done = true;
      return;
    } else if (currentRow === ROUNDS) {
      alert(`LOSER! the word was ${word}`);
      done = true;
    }
    currentGuess = '';
  }

  // takes last typed letter away makes it ''
  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';
  }

  function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      letters[currentRow * ANSWER_LENGTH + i].classList.remove('invalid');

      // long enough for the browser to repaint without the "invalid class" so we can then add it again
      setTimeout(
        () => letters[currentRow * ANSWER_LENGTH + i].classList.add('invalid'),
        10
      );
    }
    alert("That's not a word.  Use the backspace and try again");
  }
  // name the callback function so that you can see it in the console if there is an error
  //   otherwise it says anonymous function
  document.addEventListener('keydown', function handleKeyPress(event) {
    if (done || isLoading) {
      //do nothing
      return;
    }
    let action = event.key;

    // Delegate to other functions
    // const isLetter = isLetter(action);
    // switch (action) {
    //   case 'Enter':
    //     commit();
    //     break;
    //   case 'Backspace':
    //     backspace();
    //     break;
    //   case isLetter(action):
    //     addLetter(action.toUpperCase());
    //     break;
    // }
    if (action === 'Enter') {
      commit();
    } else if (action === 'Backspace') {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle('show', isLoading);
}

// takes an array of letters (like ['E', 'L', 'I', 'T', 'E']) and creates
// an object out of it (like {E: 2, L: 1, T: 1}) so we can use that to
// make sure we get the correct amount of letters marked close instead
// of just wrong or correct
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();
