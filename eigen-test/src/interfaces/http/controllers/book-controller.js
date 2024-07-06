import { BookService } from '../../../domain/book/service/book-service.js';
import { PrismaBookRepository } from '../../../infrastructure/repositories/prisma-book-repository.js';

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await bookService.getAllBooks();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const books = await bookService.create(req.body);
      res.status(200).json(books);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(parseInt(id));
      if (!book) {
        return res.status(404).send({ error: 'Book not found.' });
      }
      res.status(200).json(book);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
}

export { BookController };
