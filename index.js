const express = require('express');
const path = require('path');

const app = require('express')();
const http = require('http').Server(app);
// new instance of socket.io initialized by passing
// the 'server' object. Then you listen on the connection event
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

// broadcast to all
// get maximum value of numbers in an array
http.listen(port, () => {
    console.log('listening on ' + port);
});
