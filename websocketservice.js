// this service here hosts the websocket server
var coap        = require('coap')
  , server      = coap.createServer()
const io = require('socket.io')();

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
    keyPath: '2b11469a8c-private.pem.key',
   certPath: '2b11469a8c-certificate.pem.crt',
     caPath: 'root.pem',
  // clientId: 'Fleetman-Thing',
    host: 'a33o868glvgszv-ats.iot.us-east-1.amazonaws.com'
 });

 device.on('connect',function(){
  console.log('connected');
  device.subscribe('test/fleetman');
//  device.publish('ConnectPolicy',JSON.stringify({ test_data: 'NodeJS server connected...'}))

  setInterval(function () {
         device.publish('ConnectPolicy', JSON.stringify({ test_data: 'NodeJS server connected...Reading' }));
   }, 3000);
})

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
          io.sockets.emit('motion',obj['pirvalue']);
          res.end('Server received motion data Successfully')
        }) 

        

        device
        .on('message', function(topic, payload) {
          console.log('The pressure/temperature is ',  JSON.parse(payload.toString()).message.pressure.toString() + ":" + JSON.parse(payload.toString()).message.temperature.toString()+":" + JSON.parse(payload.toString()).message.datetime.toString() );
     //     console.log('The temperature is ',  JSON.parse(payload.toString()).message.temperature);
     io.sockets.emit('pressuretemperature',JSON.parse(payload.toString()).message.pressure.toString() + ":" + JSON.parse(payload.toString()).message.temperature.toString()+":" + JSON.parse(payload.toString()).message.datetime.toString());
        });
       
        
 });

io.listen(3002);


  
  server.listen(function() {
    console.log('server started')
  })
