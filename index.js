import express from 'express';
import userRouter from './routes/user.js';
import indexRoutes from './routes/index.js';

import { Book } from './entitys/books.js';

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/books', indexRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});