class Book {
  constructor(id, code, title, author, stock, borrowedBooks) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.author = author;
    this.stock = stock;
    this.borrowedBooks = borrowedBooks;
  }
}

export { Book };
