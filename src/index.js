import express from 'express';
import path from 'path';
import logger from './middleware/logger.js';
import err404 from './middleware/err-404.js';
import userRouter from './routes/user.js';
import indexRoutes from './routes/index.js';
import mongoose from 'mongoose';
import http from "http";
import { setSocket } from './services/socket.js';

import { ROOT_PATH } from './root-path.const.js';

const app = express();
const server = http.createServer(app);
setSocket(server);

const PORT = process.env.PORT || 3002;
const UrlDB = process.env.MONGO_URL;

app.use(express.urlencoded());
app.set('views', path.join(ROOT_PATH, '/views'))
app.set('view engine','ejs');

app.use(logger);
app.use('/user', userRouter);
app.use('/books', indexRoutes);

app.use(err404);

async function start(PORT, UrlDB) {
  try {
    await mongoose.connect(UrlDB);
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    });
  } catch(e) {
    console.log(e);
  }
}

start(PORT, UrlDB);