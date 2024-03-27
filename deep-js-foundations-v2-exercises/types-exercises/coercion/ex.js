function isValidName(name) {
  // make sure typeof name is string and check length
  if (typeof name == 'string' && name.trim().length >= 3) {
    return true;
  }
  return false;
}

function hoursAttended(attended, length) {
  //make sure parameters are valid
  // check if typeof attended is string and is not empty
  if (typeof attended == 'string' && attended.trim() != '') {
    //String is not empty, try to make it an empty
    // reassigning it to a new type if you are changing for a purpose
    attended = Number(attended);
  }
  // repeat above. Could make this a function i.e checkType
  if (typeof length == 'string' && length.trim() != '') {
    length = Number(length);
  }
  if (
    typeof attended == 'number' &&
    typeof length == 'number' && // if either above are not true return false
    // need to check if it is 0 or higher
    attended >= 0 &&
    length >= 0 &&
    //need to check if it is whole number. use builtin
    Number.isInteger(attended) &&
    Number.isInteger(length) &&
    // check that attended is less than or equal to length. We already checked everything else
    attended <= length
  ) {
    return true;
  }
  return false;
}

// tests:
console.log(isValidName('Frank') === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, '10') === true);
console.log(hoursAttended('6', 10) === true);
console.log(hoursAttended('6', '10') === true);

console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName('') === false);
console.log(isValidName('  \t\n') === false);
console.log(isValidName('X') === false);
console.log(hoursAttended('', 6) === false);
console.log(hoursAttended(6, '') === false);
console.log(hoursAttended('', '') === false);
console.log(hoursAttended('foo', 6) === false);
console.log(hoursAttended(6, 'foo') === false);
console.log(hoursAttended('foo', 'bar') === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, '6') === false);
console.log(hoursAttended('10', 6) === false);
console.log(hoursAttended('10', '6') === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, '10.1') === false);
console.log(hoursAttended('6.1', 10) === false);
console.log(hoursAttended('6.1', '10.1') === false);
