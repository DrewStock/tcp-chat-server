const net = require('net');
const ChatGroup = require('./chatGroup');
const chatGroup = new ChatGroup();

const tcp_server = net.createServer(client => {
    client.setEncoding('utf-8');
    chatGroup.create(client);
    client.write('welcome new client\n');
    console.log(client.name, 'connected!');

    client.once('data', message => {
        chatGroup.send(client, message);
    });

    client.once('end', client => {
        console.log('A client has disconnected');
        chatGroup.remove(client);
    });

    client.once('error', (err) => {
        console.log(err);
    });

});


module.exports = tcp_server;
