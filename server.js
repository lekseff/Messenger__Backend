const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");

const app = express();
const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', (ws) => {
  ws.binaryType
   ws.on('message', msg => {
     console.log(msg.toString()); // смотрим в консоли что пришло
   });

  // ws.on("error", e => ws.send(e));
});



server.listen(8080, () => console.log("Server started"))