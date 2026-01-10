import express from 'express';
import { Book } from '../entitys/books.js';

const router = express.Router();

const stor = {
    library: [
        new Book(),
        new Book(),
    ]
}

router.get('/', (req, res) => {
    const { library } = stor;
    const { id } = req.params;

    if (id) {
        const idx = library.findIndex(el => el.id === id);

        if (idx !== -1) {
            res.json(library[idx]);
        } else {
            res.status(404);
            res.json('404 | страница не найдена');
        }
    } else {
        res.json(library);
    }
})

router.get('/:id', (req, res) => {
    const { library } = stor;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(library[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
})

router.post('/', (req, res) => {
    const { library } = stor;
    const {
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;

    const newBook = new Book(
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
    )
    library.push(newBook);

    res.status(201);
    res.json(newBook);
})

router.put('/:id', (req, res) => {
    const { library } = stor;
    const {
        title,
        desc,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;
    const { id } = req.params;
    const idx = library.findIndex(el => el.id === id);

    if (idx !== -1) {
        library[idx] = {
            ...library[idx],
            title,
            desc,
            authors,
            favorite,
            fileCover,
            fileName,
        }

        res.json(library[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена')
    }
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

export default router;