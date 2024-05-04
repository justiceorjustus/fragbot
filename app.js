// https://code.visualstudio.com/docs/nodejs/nodejs-tutorial

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const WebSocket = require("ws");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var hookRouter = require("./routes/hook");
var signalsRouter = require("./routes/signals");
// var ordersRouter = require("./routes/orders");

var app = express();

tvMessages = new Array();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hook", hookRouter);
app.use("/signals", signalsRouter);
// app.use("/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// https://www.youtube.com/watch?v=wV-fDdHhGqs&ab_channel=Vuka
ws = undefined;

const server = require("http").createServer(app);
wss = new WebSocket.Server({ server: server, path: "/orders" });
wss.on("connection", function connection(socket) {
  ws = socket;
  console.log("Client connected! Total clients: " + wss.clients.size);
  ws.send("Connected.");

  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.get("/orders", (req, res) => res.send("Hello World!"));

server.listen(3000, () => console.log(`Wehsockets listening on port :3000`));

module.exports = app;

// var request = require("request");
// var clientServerOptions = {
//   url: "https://rollbit.com/public/auth/email/login",
//   body: JSON.stringify({
//     email: "kylejsimko@gmail.com",
//     password: "kA5e8K@cT&mPHd",
//     token:
//       "03AFcWeA5Jfz5ZgvdZuUyD63yZ0ToyGWMiTfEm1h0Tk_IIZjkKfyVU63vTHlOHZxKqAGPUlJB0hcZ8apwqSfEype-34Qx67jSOMksgyVibWgTImhRMMON3cDSL-5eFXJm8Ph6m7s6tr6s0Xu_QHaQj1g5IDAd5L4W6iV1Yq25Vgv1A3GjxfVFlRoLO1Pv4JNeJkSdszQGxRCmy3FyfbF8Is3FsPp6PhIcEyiJo-H-2Xd4pOEdlTFBHcFVwmPldfs-_MPYtE9JJOX9w6KN7_fF27dyAsLruT3aVH9y4kASeKOzRoNT0cxovWIhRJDixkXXXf6AnqMtewNTU930xRRzt7L4frmqFD1Egknjzy1NP2nS9Y7E2qv75-IDU-FLzDgLDCqJyk02lGtmc9DuZYe5LuHqrcqw2yMKbXiUG-14tOqF0foBpcVb93O9uCJa2Hs2B8mI4x8CSbrk05WbvwbeB7Dsur_bS11yZlSKcoXkv-pqPV78Ikz04RaG2xSDxzEx-x48-ICl6D1DBSK0M4cSZYOt5oBp8sOEfHZqpubnPcN9A5acm5qU2rK1dtMn-UAyoroDtW2NWLpgBrUYg-qmwYRCzx5O52-0QPkOvJhN7V7P31O2FL-Iz8-4CqnMfcDVLxMJZsL_uYLB4YOvPGLV4JiDOA4NR81jzp1xE28sz4NaO8OGE7NSQu_4rJ8tojc2Cd-so4pL7VkOXdE5uCf0KY9GhxKO8puKOZbDwPX5t0gC3Roxs71gGIhHiXZE8DLbgnyrxWTP2KRN6W8JzWvNJZIThcgwCjdBGKIdYT6lYtLJIKsHwSy7nhEfbAI40qnlri87oUHy9Cbm5i2RW4zXsY7LY4lIVC9fR6RANT4gPicdIh3zXLqvXW0FDpeAWQWoo5JGpCL5ishcSlJWiJBq9hR5D9f9ZjOCK30ha69LE-JvDrTjlt6lF4VoazNONKZcfLDQfj3PwPR8tWYgAjqBGCXkhyAljlFxsfWWNqEoecSB6_y5PvvWRVmN8ZsAwmhgTDKScBqy2W8e7nH75Y2sDrXy95YJepWexw1JrVMmrAp8rhMDEzaISbefWk9JXHsks7hGZ3JAgIA7T2lvL3jUrX7SJXmmTTrhwJ2qyQ42Xa52mdIL2wKMOO9kPIhpcGAb21tL3WB7z84859oWdNLMSWitLGeZGxT-n07QSTI46L8s-vzdWA6NZpIya8F8qJyW6XLUWsZYdp5X-8KMlR_EntihXickxpNGcahYu-JoDi9JT0XgvUZeWv44x0YRPhSBwu8c7zy3w3rzFKo-adcCBgNDu6qdF4Na5dtwKL0q0FCca46FeIZs_2AYqYPp7nGkZDivAK_ei2RUv-XAuhKs-fB37m28FaFEk6XqCK--AHmwDfaZzDuFL07ANeOuxa5D-Fa08plqxlcfc5O6bvTBoS6bTHBrVCnpKW0lJG7StSZKgdqyw28FHaL_BsPnjRDRaZ2Crexh91Y2nCj0kmCHoxbVjaiIWEKDt9kQXN_Fs-rOP2p_MM6nGr0ySXB9CZRqB-GXL3OqAZsavGCDIEOfN6X_2w3rhLtF7IK34BE-V0EkqIEtk0hA0_lDh4VP72SQ130UAGt7XYfm66nhvXUfn1Be_y1PDt_NKsJ5jLL5k-Z9rbwY2fJoJ9MKsOqgJ_1oh6gNjj_6xA3MgKMucBMH00Yi6Vyj5GwhoWEfgo1dadhyAw5DZUrDA6-dVqQMf_3PuJZ81kPorNizcIvKg1_HpcqtxWgD8B8yMp9tF2lTx8OJgXsGJQCUifjBmDsTVBxqrs8u3LJibVWlJlrBkZQ5hqHpqWgSjpttVb8GoqhPjKT49rOxwoyHNzzHzgb8z1gfHgeeDHK6XeB7vu1IwAdzGEx92qA3xosbzkYcUoh67w9SJ4HHNVdsvgeNYI39_y-29RkU3BOUYV5KWQowoNaPQJb3JI8NdYigA1f6NlrRDdYBq3-aDY_JRXrZGlqbN85IDjEtkwZXqlNkPtjeLMfdWBG7U-Gf7Su7Yrn0z1vqVL-Pi-h8kZGrLSOpFame_86ksawo1-pD5Hjrivp-RtxLGxnA3TeetbfiYRA",
//   }),
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// request(clientServerOptions, function (error, response) {
//   console.log(error, response.body);
//   return;
// });

// https://rollbit.com/validate

// let ws = new WebSocket('wss://rollbit.com/public/ws');

// fetch('https://rollbit.com/validate', {
// authority: 'rollbit.com',
// method: 'GET',
// path: '/validate',
// scheme: 'https',
// Accept: '*/*',
// Accept-Encoding: 'gzip, deflate, br, zstd',
// Accept-Language: 'en-US,en;q=0.9',
// Cache-Control: 'max-age=0',
// Content-Type: 'application/json',
// // method: 'GET',
// //     mode: 'no-cors',
// //     credentials:'include',
// //     headers:{
// //         'Content-Type': 'application/json',
// //         'Accept': 'application/json'
// //     }
//   })
//   .then(response => {
//     console.log(response);
//     return response.json();
//   })
//   .then(json => console.log(json))
//   .catch(error => console.log('Error resulting from json(): ' + error))

// ws.onopen = function(){
//   //Subscribe to the channel
//   ws.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"validate\",\"validation_id\":\"f17a5615-20f7-45eb-bbd4-d3bff62d88c8:00000363:1713532909575\",\"visitorId\":\"rPd5vNlo7o9st6OxFvRh\"}"}))
// }

// ws.onmessage = function(msg) {
//     console.log(JSON.parse(msg.data).message);
// }
