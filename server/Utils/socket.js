const { Server } = require('socket.io');

let io;

const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

const broadcastVoteUpdate = (voteData) => {
    if (io) {
        io.emit('voteUpdate', voteData);
    }
};

module.exports = { setupSocket, broadcastVoteUpdate };
