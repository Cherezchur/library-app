import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server);

    io.on("connection", (socket) => {
        console.log("Подключился:", socket.id);

        // сообщение себе
        socket.on('message-to-me', (msg) => {
            msg.type = 'me';
            socket.emit('message-to-me', msg);
        });

        // сообщение для всех
        socket.on('message-to-all', (msg) => {
            msg.type = 'all';
            socket.broadcast.emit('message-to-all', msg);
            socket.emit('message-to-all', msg);
        });

        // работа с комнатами
        const {roomName} = socket.handshake.query;
        console.log(`Socket roomName: ${roomName}`);
        socket.join(roomName);
        socket.on('message-to-room', (msg) => {
            msg.type = `room: ${roomName}`;
            socket.to(roomName).emit('message-to-room', msg);
            socket.emit('message-to-room', msg);
        });

        socket.on("disconnect", () => {
            console.log("Отключился:", socket.id);
        });
    });

    return io;
};

export const getSocket = () => {
    if (!io) {
        throw new Error("Socket.IO не инициализирован");
    }

    return io;
};