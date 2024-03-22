class Bookshelf {
  constructor() {
    this.favoriteBooks = [];
  }

  // TODO: define methods `addFavoriteBook(..)`
  // and `printFavoriteBooks()`
}

function addFavoriteBook(bookName) {
  if (!bookName.includes('Great')) {
    this.favoriteBooks.push(bookName);
  }
}

function printFavoriteBooks() {
  // implicit conversion
  console.log(`Favorite Books: ${this.favoriteBooks.length}`);
  for (let bookName of this.favoriteBooks) {
    console.log(bookName);
  }
}

function loadBooks(bookshelf) {
  // TODO: call fakeAjax( .. );
  // lexical scope
  fakeAjax(BOOK_API, function onBooks(bookNames) {
    //inline function expression
    for (let bookName of bookNames) {
      bookshelf.addFavoriteBook(bookName);
    }
    bookshelf.printFavoriteBooks();
  });
}

var BOOK_API = 'https://some.url/api';
var myBooks = new Bookshelf();
loadBooks(myBooks);

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      'A Song of Ice and Fire',
      'The Great Gatsby',
      'Crime & Punishment',
      'Great Expectations',
      "You Don't Know JS",
    ]);
  }, 500);
}
