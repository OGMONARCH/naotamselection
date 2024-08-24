const socketIo = require('socket.io');
let io;

exports.setupSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

exports.broadcastVoteUpdate = () => {
    if (io) {
        io.emit('voteUpdate', { message: 'Votes updated' });
    }
};
