#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'Fleetman';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log("Waiting for messages in %s", queue);
        channel.consume(queue, function(msg) {
    
          //console.log("Received '%s'", msg.content.toString());
          console.log("Received", (JSON.parse(msg.content).vehicle).toString());
       //console.log("Received", (msg.content.toString));
    
          setTimeout(function() {
            channel.ack(msg);
          }, 1000);
        });
      });
    });