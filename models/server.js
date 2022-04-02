// Servidor de express
const express =  require('express');
const http = require('http')
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        // http server
        this.server = http.createServer(this.app);
        // socket
        this.io = socketio(this.server, {/* settings */})
    }

    middleware(){
        // Deploy the public directory
        this.app.use( express.static(path.resolve(__dirname, '../public')));
    }

    setupSockets(){
        new Sockets(this.io)
    }

    execute() {
        // init middleware
        this.middleware();
        // init socket
        this.setupSockets();
        // init server
        this.server.listen(this.port, () =>{
            console.log("Server running in port: ", this.port)
        });
    }
};

module.exports = Server; 