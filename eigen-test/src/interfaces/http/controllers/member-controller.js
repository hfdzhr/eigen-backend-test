import { MemberService } from '../../../domain/member/service/member-service.js';
import { PrismaBookRepository } from '../../../infrastructure/repositories/prisma-book-repository.js';
import { PrismaMemberRepository } from '../../../infrastructure/repositories/prisma-member-repository.js';

const memberRepository = new PrismaMemberRepository();
const bookRepository = new PrismaBookRepository();
const memberService = new MemberService(memberRepository, bookRepository);

class MemberController {
  static async borrowBook(req, res) {
    try {
      const { memberCode, bookCode } = req.body;
      await memberService.borrowBook(memberCode, bookCode);
      res.status(200).send('Book borrowed successfully.');
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  static async returnBook(req, res) {
    try {
      const { memberCode, bookCode } = req.body;
      await memberService.returnBook(memberCode, bookCode);
      res.status(200).send('Book returned successfully.');
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }

  static async getAllMembers(req, res) {
    try {
      const members = await memberService.getAllMembers();
      res.status(200).json(members);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

  static async getMemberById(req, res) {
    try {
      const { id } = req.params;
      const member = await memberService.getMemberById(parseInt(id));
      if (!member) {
        return res.status(404).send({ error: 'Member not found.' });
      }
      res.status(200).json(member);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
}

export { MemberController };
