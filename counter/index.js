import express from 'express';
import bookCounter from './routes/bookCounter.js';

const app = express();
const PORT = process.env.PORT || 3002

app.use('/counter', bookCounter);

app.listen(PORT, () => {
    console.log(`Server counter is running on http://localhost:${PORT}`);
})