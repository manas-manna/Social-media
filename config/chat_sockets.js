module.exports.chatSockets = function (socketServer) {

    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://3.86.149.3:8000"
        }
    });
    io.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected');
            return;
        });

        socket.on('join_room', function (data) {
            console.log('Joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}
