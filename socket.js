const { Server } = require("socket.io");
let io;

module.exports = {
    init: httpServer => {

        io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET, POST, PUT, PATCH, DELETE'],
                allowedHeaders: ['Content-Type, Authorization'],
                credentials: true
            }
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error('Socket io not initialised');
        }
        return io;
    }
}