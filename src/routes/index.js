import express from 'express';
import path from 'path';

import fileMulter from '../middleware/file.js';

import { Book } from '../entitys/books.js';
import { ROOT_PATH } from '../root-path.const.js';
import BookModel from '../models/book.js';

const router = express.Router();

const stor = {
    library: [
        new Book(),
        new Book(),
    ]
}

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
    const { library } = stor;
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

    console.log('get id:', id);
    
    try {
        const book = await BookModel.findById(id).select('-__v');

        console.log('get id book:', book);

        if (!book) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }

        res.render('library/view', {
            title: 'Книга',
            book: book,
        });
    } catch(e) {
        res.status(500).json(e);
    }
})

router.get('/:id/download', (req, res) => {
    try {
 
    } catch(e) {
        res.status(500).json(e);
    }
    const { library } = stor;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);

    if (idx !== -1) {
        const fileName = library[idx].fileBook;
        const options = {
            root: path.join(ROOT_PATH, 'public')
        };
        res.sendFile(fileName, options, (err) => {          
            if (err) {
                res.status(404).send('Файл не найден');
            }
        });
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
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
    const { library } = stor;
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