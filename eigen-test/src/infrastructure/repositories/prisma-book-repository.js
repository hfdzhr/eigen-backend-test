import { BookRepository } from '../../domain/book/repositories/book-repository.js';
import { prisma } from '../prisma/client.js';

class PrismaBookRepository extends BookRepository {
  async findById(bookId) {
    return prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  async findByCode(bookCode) {
    return prisma.book.findUnique({
      where: { code: bookCode },
      include: { borrowedBooks: true },
    });
  }

  async findByTitle(bookTitle) {
    return prisma.book.findFirst({
      where: {
        title: bookTitle,
      },
    });
  }

  async create(book) {
    return prisma.book.create({
      data: book,
    });
  }

  async save(book) {
    return prisma.book.update({
      where: { id: book.id },
      data: book,
    });
  }

  async findAll() {
    return prisma.book.findMany({
      where: { stock: { gt: 0 } },
    });
  }

  async updateStock(bookId, change) {
    return prisma.book.update({
      where: { id: bookId },
      data: {
        stock: {
          increment: change,
        },
      },
    });
  }
}

export { PrismaBookRepository };
