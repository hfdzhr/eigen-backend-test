class MemberService {
  constructor(memberRepository, bookRepository) {
    this.memberRepository = memberRepository;
    this.bookRepository = bookRepository;
  }

  async borrowBook(memberCode, bookCode) {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member) {
      throw new Error('Member not found.');
    }

    if (!book) {
      throw new Error('Book not found.');
    }

    if (member.borrowedBooks.length >= 2) {
      throw new Error('You cannot borrow more than 2 books.');
    }

    if (book.borrowedBooks.length > 0) {
      throw new Error('This book is already borrowed by another member.');
    }

    if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
      throw new Error('You are currently penalized and cannot borrow books.');
    }

    await this.bookRepository.updateStock(book.id, -1);
    await this.memberRepository.addBorrowedBook(member.id, book.id);
  }

  async returnBook(memberCode, bookCode) {
    const member = await this.memberRepository.findByCode(memberCode);
    const book = await this.bookRepository.findByCode(bookCode);

    if (!member) {
      throw new Error('Member not found.');
    }

    if (!book) {
      throw new Error('Book not found.');
    }

    const borrowedBook = member.borrowedBooks.find((b) => b.bookId === book.id);

    if (!borrowedBook) {
      throw new Error('This book was not borrowed by this member.');
    }

    const borrowedAt = new Date(borrowedBook.borrowedAt);
    const daysBorrowed = (new Date() - borrowedAt) / (1000 * 60 * 60 * 24);

    if (daysBorrowed > 7) {
      member.penaltyEndDate = new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      );
    }

    await this.bookRepository.updateStock(book.id, 1);
    await this.memberRepository.removeBorrowedBook(
      member.id,
      book.id,
      daysBorrowed > 7 ? member.penaltyEndDate : null
    );
  }

  async getAllMembers() {
    return await this.memberRepository.findAll();
  }

  async getMemberById(id) {
    return await this.memberRepository.findById(id);
  }
}

export { MemberService };
