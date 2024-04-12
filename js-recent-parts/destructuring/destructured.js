function data() {
  return [1, 2, 3, 4, 5];
}

var [first, second = 10, third, ...fourth] = data() || [];
