const io = require('socket.io')();
//const socket = require('socket.io');


io.on('connection', client => { 

    console.log(`new Connection ${client.id}`);
    
    client.on('chat',function(data){
        io.sockets.emit('chat',data);
        })
    client.on('typing',function(data){
        io.sockets.emit('typing',data);
        })

 });

io.listen(3001);