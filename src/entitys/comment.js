import { v4 as uuidv4 } from 'uuid';

export class Comment {
    constructor(
        text = 'Текст комментария',
        bookId = '',
        date = new Date().toLocaleString(),
        id = uuidv4(),
    ) {
        this.text = text
        this.bookId = bookId
        this.date = date
        this.id = id
    }
}