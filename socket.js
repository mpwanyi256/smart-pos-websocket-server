const { Server } = require("socket.io");
let io;

const userConnect = (socket) => {
    console.log('a new user connected', socket.id);
};

const onDisconnect = () => {
    console.log('a user disconnected');
};

const onMessage = (message) => {
    console.log('New Event from client');
    // io.broadcast.emit('message', message);
}

module.exports = {
    init: httpServer => {

        io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET, POST, PUT, PATCH, DELETE'],
                allowedHeaders: ['Content-Type, Authorization'],
                credentials: false,
            }
        });
        io.on('connection', userConnect);
        io.on('disconnect', onDisconnect);
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket io not initialised');
        }
        return io;
    },
    notify: (data) => {
        console.log('notify', data);
        io.emit('message', data);
    },
};
