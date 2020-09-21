// this service here hosts the websocket server
var coap        = require('coap')
  , server      = coap.createServer()
const io = require('socket.io')();


io.on('connection', client => { 

    /*
    setInterval(function(){
        let ab = Math.floor((Math.random() * 100) + 1);
        console.log("The random value is " + ab);
        io.sockets.emit('temperature',ab);
        }, 10000);  */

        server.on('request', function(req, res) {
            //res.end('Hello ' + req.url.split('/')[1] + '\n')
            const obj = JSON.parse(req.payload)
            console.log("THE PIR VALUE IS " + obj['pirvalue'])
            io.sockets.emit('temperature',obj['pirvalue']);
            res.end('Server received motion data Successfully')
          })
        
 });

io.listen(3002);


  
  server.listen(function() {
    console.log('server started')
  })