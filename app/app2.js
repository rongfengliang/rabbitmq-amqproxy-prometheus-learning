var q = 'tasks';
 
var open = require('amqplib').connect('amqp://dalong:dalong@127.0.0.1:5673');
 
// Publisher
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  ch.assertQueue(q).then(function(ok) {
    for (var i = 0; i <50000;i++){
        ch.sendToQueue(q, Buffer.from('something to do'));
    }
  });
}).catch(console.warn);
 
// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);