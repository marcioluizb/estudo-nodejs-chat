var socket = io("http://localhost:3000");

$(document).ready(function(){
  $('#enter').submit(function(e){
    e.preventDefault();
    if($('#nickname').val() == "")
    {
      alert("Digite o apelido");
      return false;
    }
    socket.emit("join", $('#nickname').val());
    $('#login').hide();
    $('#chat').show();  
  });

  $('#send').click(function(e){
    if($('#text').val() != "")
    {
      socket.emit("send", $('#text').val());
      $('#text').val('');
    }
  });

  socket.on("update", function(msg){
    $('#messages').append('<p>' + msg + '</p>');
  });

  socket.on("chat", function(msg){
    $('#messages').append('<p>' + msg + '</p>');
  });

});