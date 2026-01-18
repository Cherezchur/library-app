import express from 'express';
import { User } from '../entitys/user.js';

const router = express.Router();

router.post('/login', (req, res) => {
    res.status(201);
    res.json(new User());
})

export default router;
