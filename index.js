import express from 'express';
// import expressLayouts from 'express-ejs-layouts';
import logger from './middleware/logger.js';
import err404 from './middleware/err-404.js';
import userRouter from './routes/user.js';
import indexRoutes from './routes/index.js';

const app = express();
app.use(express.json());
app.set('view engine', 'ejs')

app.use(logger);
app.use('/api/user', userRouter);
app.use('/api/books', indexRoutes);

app.use(err404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});