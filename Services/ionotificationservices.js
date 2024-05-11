// // NotificationService.js
// const socketIo = require('socket.io');
// const Web3 = require('web3');
// const contractABI = require('../keys/ContractABI.json');
// const contractAddress = 'YOUR_CONTRACT_ADDRESS';
// const web3 =  Web3( Web3.providers.WebsocketProvider(process.env.YOUR_INFURA_WSS_ENDPOINT));

// const contract =  web3.eth.Contract(contractABI, contractAddress);

// class NotificationService {
//     constructor(server) {
//         this.io = socketIo(server);
//         this.listenToEvents();
//     }

//     // listenToEvents() {
//     //     // Listen for specific smart contract events and broadcast them to connected clients
//     //     contract.events.OrderCreated({ fromBlock: 'latest' })
//     //         .on('data', (event) => {
//     //             this.io.emit('OrderCreated', event.returnValues);
//     //         })
//     //         .on('error', console.error);

//     //     contract.events.OrderAccepted({ fromBlock: 'latest' })
//     //         .on('data', (event) => {
//     //             this.io.emit('OrderAccepted', event.returnValues);
//     //         })
//     //         .on('error', console.error);

//     //     // Add more listeners as needed for other events
//     // }

//     // Initialize socket.io listeners for client interactions
//     initSocketListeners() {
//         this.io.on('connection', (socket) => {
//             console.log('Client connected:', socket.id);

//             // Example: on client request, emit the current state or a welcome message
//             socket.on('requestInitialState', () => {
//                 socket.emit('InitialState', { message: 'Welcome to the notification service' });
//             });

//             // Handle disconnection
//             socket.on('disconnect', () => {
//                 console.log('Client disconnected:', socket.id);
//             });
//         });
//         socket.on('customEvent', (data) => {
//             console.log('Received customEvent with data:', data);
//             // Process the event, then emit a response
//             socket.emit('customEventResponse', { message: 'Response to custom event' });
//         });
//     }
// }

// module.exports = NotificationService;
// NotificationService.js
const socketIo = require('socket.io');
const Web3 = require('web3');

// Load your contract's ABI and address
const contractABI = require('../keys/ContractABI.json');
const contractAddress = require("../keys/ContractAddress");

// Assuming you are using ganache or another network; replace with your Websocket endpoint
const ganacheUrl = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

const contract = new web3.eth.Contract(contractABI, contractAddress);

class NotificationService {
    constructor(server) {
        this.io = socketIo(server);
        this.initSocketListeners();
    }

    initSocketListeners() {
        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            // Example: On client request, emit the current state or a welcome message
            socket.on('requestInitialState', () => {
                socket.emit('InitialState', { message: 'Welcome to the notification service' });
            });

            // Custom event listener example
            socket.on('customEvent', (data) => {
                console.log('Received customEvent with data:', data);
                // Process the event, then emit a response
                socket.emit('customEventResponse', { message: 'Response to custom event' });
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        // Example of listening to a smart contract event and broadcasting to clients
        contract.events.OrderCreated({
            fromBlock: 'latest'
        }).on('data', (event) => {
            this.io.emit('OrderCreated', event.returnValues);
        }).on('error', console.error);
        
        // Add more contract event listeners as needed...
    }
}

module.exports = NotificationService;
