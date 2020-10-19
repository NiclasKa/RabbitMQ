const amqp = require('amqplib/callback_api');

function sendMessage(channel, queue, msg) {
   channel.sendToQueue(queue, Buffer.from(msg));
   console.log("Sent %s", msg);
}

function connect() {
   amqp.connect('amqp://guest:guest@rabbitmq3:5672', function(error0, connection) {
      if (error0) throw error0;
      connection.createChannel(async function(error1, channel) {
         if (error1) throw error1;

         const exchange = "topic_logs";
         const key = "my.o";

         channel.assertExchange(exchange, "topic", {
            durable: false
         });

         channel.publish(exchange, key, Buffer.from("MSG_1"));

         await new Promise(resolve => setTimeout(resolve, 3000))

         channel.publish(exchange, key, Buffer.from("MSG_2"));

         await new Promise(resolve => setTimeout(resolve, 3000))

         channel.publish(exchange, key, Buffer.from("MSG_3"));

         setTimeout(function() {
            connection.close();
            process.exit(0);
         }, 1000);
      });
   });
}
setTimeout(connect, 15000);