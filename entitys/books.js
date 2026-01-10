import { v4 as uuidv4 } from 'uuid';

export class Book {
    constructor(
        title = '',
        desc = '',
        authors = '',
        favorite = '',
        fileCover = '',
        fileName = '',
        id = uuidv4(),
    ) {
        this.title = title
        this.desc = desc
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = id
    }
}
