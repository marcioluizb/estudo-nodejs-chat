const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 3000;

app.set('view engine', 'ejs');
app.use('/javascript', express.static('./vendor/javascript'));
app.use('/library', express.static('./node_modules'));

var clients = {};

io.on("connection", function(client){
  client.on("join", function(name){
    clients[client.id] = name;
    console.log("User " + name + " connected");
    client.emit("update", "Você entrou no chat.");
    io.emit("update", name+" Entrou no chat.");
  });

  client.on("send", function(msg){
    console.log(clients[client.id] + " disse: " + msg);
    io.emit("chat", clients[client.id] + " disse: " + msg);
  });

  client.on("disconnect", function(){
    console.log(clients[client.id] + " saiu da sala.");
    io.emit("update", clients[client.id] + " saiu da sala.");
    delete clients[client.id];
  });

});

app.get('/', function(req, res){
  res.render("index.ejs");
});

http.listen(port, function(){
  console.log('Server listen ' + port);
});