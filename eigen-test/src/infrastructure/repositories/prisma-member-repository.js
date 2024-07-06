import { MemberRepository } from '../../domain/member/repositories/member-repository.js';
import { prisma } from '../prisma/client.js';

class PrismaMemberRepository extends MemberRepository {
  async findById(memberId) {
    return prisma.member.findUnique({
      where: { id: memberId },
      include: { borrowedBooks: true },
    });
  }

  async findByCode(memberCode) {
    console.log(memberCode);
    return prisma.member.findFirst({
      where: { code: memberCode },
      include: { borrowedBooks: true },
    });
  }

  async save(member) {
    return prisma.member.update({
      where: { id: member.id },
      data: member,
    });
  }

  async findAll() {
    return prisma.member.findMany({
      include: { borrowedBooks: true },
    });
  }

  async addBorrowedBook(memberId, bookId) {
    return prisma.borrowedBook.create({
      data: {
        memberId,
        bookId,
        borrowedAt: new Date(),
      },
    });
  }

  async removeBorrowedBook(memberId, bookId, penaltyEndDate = null) {
    await prisma.borrowedBook.deleteMany({
      where: {
        memberId,
        bookId,
      },
    });

    if (penaltyEndDate) {
      await prisma.member.update({
        where: { id: memberId },
        data: { penaltyEndDate },
      });
    }
  }
}

export { PrismaMemberRepository };
