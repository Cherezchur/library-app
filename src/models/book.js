import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        default: ''
    },
    authors: {
        type: String,
        default: ''
    },
    favorite: {
        type: Boolean,
        default: false
    },
    fileCover: {
        type: String,
    },
    fileName: {
        type: String,
    },
})

export default model('BookModel', bookSchema);
