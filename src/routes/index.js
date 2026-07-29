import express from 'express';
import path from 'path';

import fileMulter from '../middleware/file.js';

import { Book } from '../entitys/books.js';
import { ROOT_PATH } from '../root-path.const.js';
import BookModel from '../models/book.js';
import CommentModel from '../models/comment.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find().select('-__v');
        
        res.render('library/index', {
            title: 'Библиотека',
            library: books
        });
    } catch(e) {
        res.status(500).json(e);
    }
})

router.get('/create', (req, res) => {
    res.render('library/create', {
        title: 'Добавить книгу в библиотеку',
    });
})

router.post('/create', async (req, res) => {;
    const {
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    } = req.body;

    const newBook = new BookModel({
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    });

    try {
        await newBook.save();
        res.redirect('/books');
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await BookModel.findById(id).select('-__v');
        const comments = await CommentModel.find({ bookId: id }).select('-__v');

        if (!book) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }

        res.render('library/view', {
            title: 'Книга',
            book: book,
            comments: comments.reverse()
        });
    } catch(e) {
        res.status(500).json(e);
    }
})

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id).select('-__v');

    if (book) {
        res.render('library/update', {
            title: 'Редактировать книгу',
            book: book,
        });
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
})

router.post('/update/:id', async (req, res) => {
    const {
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    } = req.body;

    const { id } = req.params;

    try {
        await BookModel.findByIdAndUpdate(id, {
            title,
            desc,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        });
        res.redirect(`/books/${id}`);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id',  async (req, res) => {
    const { id } = req.params;
    
    try {
        await BookModel.findByIdAndDelete({_id: id});
        res.redirect('/books');
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/upload-file', 
    fileMulter.single('book-file'),
    (req, res) => {      
        if (req.file) {
            const {path} = req.file;
            res.json({path});
        }
        res.json();
    }
)

export default router;