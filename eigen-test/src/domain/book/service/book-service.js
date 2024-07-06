import { validate } from '../../../interfaces/http/error/validation.js';
import { createBookValidation } from '../validations/book-validation.js';

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async getAllBooks() {
    return await this.bookRepository.findAll();
  }

  async getBookById(id) {
    return await this.bookRepository.findById(id);
  }

  async create(payload) {
    const book = validate(createBookValidation, payload);

    const bookIsAlreadyExist = await this.bookRepository.findByTitle(
      book.title
    );
    const codeBookIsAlreadyExist = await this.bookRepository.findByCode(
      book.code
    );

    if (bookIsAlreadyExist >= 1) {
      throw new Error('Books Title is already exist');
    }

    if (codeBookIsAlreadyExist >= 1) {
      throw new Error('Books Code is already exist');
    }

    return await this.bookRepository.create(book);
  }
}

export { BookService };
