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

// require("dotenv").config();
// const NotificationService =require("./Services/ionotificationservices")
// const express = require("express");
// const app = express();
// const { Server } = require("socket.io");
// const port = 8081;
// const connectDB = require("./Config/db"); // Import MongoDB connection

// const bodyparser = require("body-parser");
// const http = require("http");
// const server = http.createServer(app);
// const authRoutes = require("./Routes/authRoutes");
// const escrowRoutes = require("./Routes/escrowRoutes");
// const orderRoutes = require("./Routes/orderRoutes");
// const io = new Server(server);


// const helmet = require("helmet");
// const cors = require("cors");
// const userRoutes = require("./Routes/userRoutes");


// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);
// });

// require("./services/NotificationService")(io);
// // Connect to MongoDB
// connectDB();

// app.use(helmet());
// app.use(cors({ origin: "http://localhost:3000" }));
// // Configuring Express Server
// app.use(bodyparser.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/escrow", escrowRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);


// app.use("*", (req, res, next) => {
//   console.log("Unhandled request to URL:", req.originalUrl);
//   res.status(404).json({
//     status: `Fail`,
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });
// new NotificationService(server);
// app.listen(port, () => {
//   console.log(`Server is listening on Port ${port}`);
// });



// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./Config/db");

// const helmet = require("helmet");
// const cors = require("cors");

// // Routes
// const authRoutes = require("./Routes/authRoutes");
// const escrowRoutes = require("./Routes/escrowRoutes");
// const orderRoutes = require("./Routes/orderRoutes");
// const userRoutes = require("./Routes/userRoutes");

// // Notification Service
// const NotificationService = require("./Services/ionotificationservices");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Connect to MongoDB
// connectDB();

// // Middlewares
// app.use(helmet());
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Initialize Notification Service with Socket.IO instance
// new NotificationService(io);

// // Use routes
// app.use("/api/users", userRoutes);
// app.use("/api/escrow", escrowRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

// app.use("*", (req, res) => {
//   console.log("Unhandled request to URL:", req.originalUrl);
//   res.status(404).json({
//     status: "Fail",
//     message: `Can't find ${req.originalUrl} on this server`,
//   });
// });

// const port = process.env.PORT || 8081;
// server.listen(port, () => {
//   console.log(`Server is listening on Port ${port}`);
// });


// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const connectDB = require("./Config/db");

// const helmet = require("helmet");
// const cors = require("cors");

// // Middleware imports
// const verifyToken = require('./middleware/authMiddleware');

// // Routes
// const authRoutes = require("./Routes/authRoutes");
// const escrowRoutes = require("./Routes/escrowRoutes");
// const userRoutes = require("./Routes/userRoutes");
// const orderRoutes = require("./Routes/orderRoutes");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Connect to MongoDB
// connectDB();

// // Security Middleware
// app.use(helmet());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// // Body parsing Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Apply JWT Authentication Middleware to protect routes (adjust as needed)
// app.use(verifyToken);

// // Initialize and use routes
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes(io));  // assuming orderRoutes are set up to accept 'io'
// app.use("/api/escrow", escrowRoutes);
// app.use("/api/users", userRoutes);

// // Error handling for unhandled requests
// app.use((req, res) => {
//   res.status(404).json({
//     status: "Fail",
//     message: `Can't find ${req.originalUrl} on this server`
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(`Error: ${err.message}`);
//   res.status(500).send({ status: 'error', message: err.message });
// });

// const port = process.env.PORT || 8081;
// server.listen(port, () => {
//   console.log(`Server is listening on Port ${port}`);
// });



require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./Config/db");
const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Specify the client URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// WEB PUSH Notification connection
const webPush = require('web-push');
webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Connect to the database
connectDB();

// Middlewares for Express
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route initializers
const authRoutes = require("./Routes/authRoutes");
const escrowRoutes = require("./Routes/escrowRoutes");
const userRoutes = require("./Routes/userRoutes");
const initOrderRoutes = require("./Routes/orderRoutes");
const statsRoutes = require("./Routes/statsRoutes")
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/escrow", escrowRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", initOrderRoutes(io));  // Pass io instance to orders routes
app.use ("/api/stats", statsRoutes)
// Error handling for non-existing routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});


