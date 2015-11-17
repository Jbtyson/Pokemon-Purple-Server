// server.js
var util = require("util"),
    io = require("socket.io"),
    mysql = require("mysql"),
    User = require("./user").User;
    Db = require("./db").Db;

var PORT = 8080,
    DB_HOST = "mysql.cis.ksu.edu";
    DB_USERNAME = "jbtyson";
    DB_PASSWORD = "secretpassword"
    DB_NAME = "jbtyson";


var socket;
var users;
var dbConnection;
var db;

function init() {
  console.log("Initializing...");
  users = [];

  console.log("Connecting to db...");
  connection =  mysql.createConnection({
  	host : DB_HOST,
  	user : DB_USERNAME,
  	password: DB_PASSWORD,
    database: DB_NAME
  });
  connection.connect();
  db = new Db(connection);

  console.log("Initialization complete.");
  socket = io.listen(PORT);
  console.log("Listening on port " + PORT);

  setEventHandlers();
}

var setEventHandlers = function() {
  socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(client) {
  util.log("New player has connected: " + client.id);

  client.on("authenticate", onAuthenticate);
  client.on("disconnect", onClientDisconnect);
}

function onAuthenticate(message) {
  util.log(this.id + " attempting login using: " + message.username + ", " + message.password);
  var user = new User(this, message.username, message.password)
  db.authenticate(user.username, user.password);
  if(user.playerId == -1) {
    // auth failed
    util.log(this.id + " login failed.");
    this.emit("auth failed");
  }
  else {
    // auth success
    util.log(this.id + " logged in with id: " + user.playerId);
    users.push(user);
    this.emit("auth success", {username: user.username, playerId: user.playerId});
  }
}

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

init();
