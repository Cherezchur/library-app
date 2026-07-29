import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        default: "",
    },
    bookId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'BookModel',
    },
    date: {
        type: String,
        default: new Date().toLocaleString(),
    },
})

export default model('CommentModel', commentSchema);