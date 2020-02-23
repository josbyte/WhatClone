var pathComp= require("express-static");
var siofu = require("socketio-file-upload");
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SocketIOFileUpload = require('socketio-file-upload');
var port = process.env.PORT || 3000;




app.get('/', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/index.html');
  app.use(pathComp(__dirname + '/'));
  app.use(SocketIOFileUpload)
  app.use(siofu.router)
});
var users = {}
io.on('connection', socket => {
  var uploader = new SocketIOFileUpload();
  uploader.dir = "./uploads";
  uploader.listen(socket);

  socket.on('base64 file', function (msg) {
    console.log('received base64 file from' + msg.username);
    socket.username = msg.username;
    // socket.broadcast.emit('base64 image', //exclude sender
    io.sockets.emit('base64 file',  //include sender
        {
          username: socket.username,
          file: msg.file,
          fileName: msg.fileName
        }

    );
  });
  socket.on('send-chat-message', ({message, name}) => {
    socket.broadcast.emit('chat-message', { message: message, name: users[name][0], img: users[name][2]})
  })

  socket.on('new-user',({name, status, img}) => {
    users[name] = [name, status, img];
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('checkOnlineUsers', () => {
      var usersOnline=[]
      console.log(Object.keys(users)[0]);
      for(var i=0;i<Object.keys(users).length;i++){
        usersOnline[i]=Object.keys(users)[i]
        console.log("loop:"+usersOnline)
      }
      socket.emit('giveOnlineUsers', usersOnline)
  });
        
  socket.on('typing', (data)=>{
    if(data.typing==true)
       socket.broadcast.emit('display', data)
    else
       socket.broadcast.emit('display', data)
  })
})
http.listen(port)
