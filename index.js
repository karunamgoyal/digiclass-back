require('dotenv').config();
//Initial imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const handle=require('./handlers');
const routes = require('./routes');
// server created
const app = express();
//basic middle ware
app.use(cors());
const socket = require('socket.io');
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
//test app
app.get('/',function(req,res){
    res.send("Hello world");
});
//middleware

app.use('/api/auth',routes.auth);
app.use('/api/class',routes.course);
app.use('/api/discussion',routes.chat);
//error control 
app.use(handle.notFound);
app.use(handle.errors);

//starting serverS
var server=app.listen(port,console.log('Server started on '+port));

//adding sockets for discussion

var io = socket(server);

io.on('connection',function(socket){
    socket.on('discussion',function(data){
        socket.join(data.id);
    })
    socket.on('chat',function(data){
        io.sockets.in(data.id).emit('chat',data.message);
    });
    socket.on('typing',function(data){
        socket.in(data.id).broadcast.emit('typing',data.handle);
    });
});