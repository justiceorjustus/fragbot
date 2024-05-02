// var express = require("express"); // https://stackoverflow.com/questions/27852631/catch-webhook-node-js

// var express = require("express"),
//   bodyParser = require("body-parser"),
//   app = express(),
//   port = 3333;
// var router = express.Router();

// const server = require("http").createServer(app);
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ server: server });

// wss.on("connection", function connection(socket) {
//   ws = socket;
//   console.log("A new client Connected!");
//   ws.send("Welcome New Client!");

//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);

//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// app.get("/", (req, res) => res.send("Hello World!"));

// server.listen(3333, () => console.log(`Lisening on port :3333`));
// module.exports = router;
