import { Server } from 'socket.io';
import CommentModel from '../models/comment.js';

export function setSocket(server) {
    let io = new Server(server);

    io.on("connection", (socket) => {
        const {roomName} = socket.handshake.query;
        socket.join(roomName);

        socket.on('message-to-room', (msg) => {
            msg.type = `room: ${roomName}`;
            socket.to(roomName).emit('message-to-room', msg);
            socket.emit('message-to-room', msg);

            const newComment = new CommentModel({
                    comment: msg.comment,
                    bookId: msg.bookId,
                    date: new Date().toLocaleString(),
                });
            newComment.save();
        });

        socket.on("disconnect", () => {
            console.log("Отключился:", socket.id);
        });
    });
}