import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { bookRouter } from './src/interfaces/http/routes/book-route.js';
import { memberRouter } from './src/interfaces/http/routes/member-route.js';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/books', bookRouter);
app.use('/api/members', memberRouter);

app.listen(3000, () => {
  console.log('Server running at localhost:3000');
});
