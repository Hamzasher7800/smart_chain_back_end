require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./Config/db');
const webPush = require('web-push');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

webPush.setVapidDetails(
    `mailto:${process.env.VAPID_EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

connectDB();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./Routes/authRoutes');
const escrowRoutes = require('./Routes/escrowRoutes');
const userRoutes = require('./Routes/userRoutes');
const initOrderRoutes = require('./Routes/orderRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const statsRoutes = require('./Routes/statsRoutes');
app.use('/api/stats', statsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', initOrderRoutes(io));
app.use('/api/profile', profileRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});

const port = process.env.PORT || 8081;
server.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('registerProvider', (providerId) => {
        socket.providerId = providerId;
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = io;
