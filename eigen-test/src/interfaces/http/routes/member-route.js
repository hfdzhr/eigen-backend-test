import express from 'express';
import { MemberController } from '../controllers/member-controller.js';

const memberRouter = express.Router();

memberRouter.post('/borrow', MemberController.borrowBook);
memberRouter.post('/return', MemberController.returnBook);
memberRouter.get('/', MemberController.getAllMembers);
memberRouter.get('/:id', MemberController.getMemberById);

export { memberRouter };
