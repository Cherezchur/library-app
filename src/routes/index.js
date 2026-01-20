import express from 'express';
import path from 'path';
import axios from 'axios';

import fileMulter from '../middleware/file.js';

import { Book } from '../entitys/books.js';
import { ROOT_PATH } from '../root-path.const.js';

const router = express.Router();

const stor = {
    library: [
        new Book(),
        new Book(),
    ]
}

async function getViewsCount(bookId) {
    const response = await axios.get(`http://localhost:8001/counter/${bookId}`);

    return response.data.count
        ? response.data.count
        : ''
}

router.get('/', (req, res) => {
    const { library } = stor;
    
    res.render('library/index', {
        title: 'Библиотека',
        library: library
    });
})

router.get('/create', (req, res) => {
    res.render('library/create', {
        title: 'Добавить книгу в библиотеку',
    });
})

router.get('/:id', async (req, res) => {
    const { library } = stor;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);
    const viewsCount = await getViewsCount(idx);

    console.log('get book', idx, viewsCount);

    if (idx !== -1) {
        res.render('library/view', {
            title: 'Книга',
            book: library[idx],
            viewsCount: viewsCount,
        });
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
})

router.get('/:id/download', (req, res) => {
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

router.post('/create', (req, res) => {;
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

    const newBook = new Book(
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    )
    
    library.push(newBook);

    res.redirect('/books');
})

router.get('/update/:id', (req, res) => {
    const { library } = stor;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render('library/update', {
            title: 'Редактировать книгу',
            book: library[idx]
        });
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
}) 

router.post('/update/:id', (req, res) => {
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
    const idx = library.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    library[idx] = {
        ...library[idx],
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    }

    res.redirect(`/books/${id}`);
})

router.delete('/:id', (req, res) => {
    const { library } = stor;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);

    if(idx !== -1) {
        library.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json('404 | страница не найдена')
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