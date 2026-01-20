import express from 'express';
import redis from 'redis';

const router = express.Router();
// const REDIS_URL = process.env.REDIS_URL || 'redis://storage';

const redisClient = redis.createClient();

async function redisConnecting() {
    console.log('Redis connecting...');
    await redisClient.connect().then(() => {
        console.log('Redis подключен');
    }).catch(console.error);
}

await redisConnecting();

router.post('/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;

    try {
        const newCount = await redisClient.incr(`bookCounter: ${bookId}`);
        const idx = await redisClient.get(`bookCounter: ${bookId}`);

        if (idx !== -1) {
            res.json({ count: newCount });
        } else {
            res.status(404);
            res.json('404 | страница не найдена');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err});
    }
});

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const count = await redisClient.get(`bookCounter: ${bookId}`);

    if (count) {
        res.json({ count: count });
    } else {
        res.status(404);
        res.json('404 | страница не найдена')
    }
})


export default router;