const http = require('http');
const express = require( 'express');
const WebSocket = require( 'ws');
const uuid = require('uuid');
const Logic = require('./Logic');
const logic = new Logic();

const app = express();
const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', (ws) => {
  const id = uuid.v4();
  ws.on('message', msg => {
    const data = JSON.parse(msg);
    data.id = id;
    switch(data.event) {
      case 'login':
        ws.send(JSON.stringify(logic.loginHandler(data)));
        break;
      case 'newParticipant':
        multipleSending(data);
        break;
      case 'sendMessage':
        multipleSending(logic.sendChatMessage(data));
    }    
  });

  ws.on('close', () => {
    const data = logic.offlineParticipant(id);
    multipleSending(data);
  });

  ws.on("error", e => ws.send(e));
});

server.listen(8080, () => console.log("Server started 8080"));

/**
 * Рассылка по всем сокетам
 * @param {*} data - данные
 */
function multipleSending(data) {
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  })
}