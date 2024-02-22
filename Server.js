// require("dotenv").config();

// const express = require("express");
// const app = express();
// const port = 8081;

// const bodyparser = require("body-parser");
// const http = require("http");
// const server = http.createServer(app);
// const authRoutes = require("./Routes/authRoutes");
// const escrowRoutes =require("./Routes/escrowRoutes")

// const helmet = require("helmet");
// const cors = require("cors");
// const locationRoutes = require("./Routes/locationRoutes");
// const websocketServer = require("./Sockets/webSockets");

// app.use(helmet());
// app.use(cors({ origin: "http://localhost:3000" }));
// //Configuring Express Server
// app.use(bodyparser.json());
// app.use(express.urlencoded({ extended: true }));

// //Routes

// //Routes Track
// app.use("/api/escrow", escrowRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/location", locationRoutes);

// server.on("upgrade", (request, socket, head) => {
//   websocketServer.handleUpgrade(request, socket, head, (ws) => {
//     websocketServer.emit("connection", ws, request);
//   });
// });
// app.use("*", (req, res, next) => {
//   console.log("Unhandled request to URL:", req.originalUrl);
//   res.status(404).json({
//     status: `Fail`,
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on Port ${port}`);
// });


require("dotenv").config();

const express = require("express");
const app = express();
const port = 8081;
const connectDB = require('./Config/db'); // Import MongoDB connection

const bodyparser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const authRoutes = require("./Routes/authRoutes");
const escrowRoutes = require("./Routes/escrowRoutes");

const helmet = require("helmet");
const cors = require("cors");
const locationRoutes = require("./Routes/locationRoutes");
const websocketServer = require("./Sockets/webSockets");

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
// Configuring Express Server
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/escrow", escrowRoutes);
app.use("/api/auth", authRoutes);
app.use("/location", locationRoutes);

server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (ws) => {
    websocketServer.emit("connection", ws, request);
  });
});

app.use("*", (req, res, next) => {
  console.log("Unhandled request to URL:", req.originalUrl);
  res.status(404).json({
    status: `Fail`,
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
