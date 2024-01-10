// websocket.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', ws => {
  ws.on('message', message => {
    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

module.exports = wss;
