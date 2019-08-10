var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("A new user is connected");
  socket.on("disconnect", function() {
    console.log("a user got disconnected");
  });
  socket.on("chat message", function(msg) {
    console.log("received message: " + msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, function() {
  console.log("Server running on 3000");
});
