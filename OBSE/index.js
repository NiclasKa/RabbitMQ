const amqp = require('amqplib/callback_api');
const fs = require('fs');

function connect() {
   amqp.connect('amqp://guest:guest@rabbitmq3:5672', function(error0, connection) {
      if (error0) {
         throw error0;
      }
      connection.createChannel(function(error1, channel) {
         if (error1) {
               throw error1;
         }

         fs.writeFile('logs.txt', '', function (err) {
            if (err) throw err;
         }); 

         const exchange = 'topic_logs';

         channel.assertExchange(exchange, 'topic', {
            durable: false
         });

         channel.assertQueue('', {
            exclusive: true
         }, function(error2, q) {
            if (error2) throw error2;

            channel.bindQueue(q.queue, exchange, "my.i");
            channel.bindQueue(q.queue, exchange, "my.o");
      
            channel.consume(q.queue, function(msg) {
               const date = new Date().toISOString();
               const write = `${date} Topic ${msg.fields.routingKey}: ${msg.content.toString()}`;
               fs.appendFile('logs.txt', write, function (err) {
                  if (err) throw err;
               }); 
            }, {
              noAck: true
            });
         });
      });
   });
}
setTimeout(connect, 13000);