import { v4 as uuidv4 } from 'uuid';

export class Book {
    constructor(
        title = 'Заголовок книги',
        desc = '',
        authors = '',
        favorite = false,
        fileCover = '',
        fileName = '',
        fileBook = '1768069608034-ffffff.txt',
        id = uuidv4(),
    ) {
        this.title = title
        this.desc = desc
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook,
        this.id = id
    }
}
