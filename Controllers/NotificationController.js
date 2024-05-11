// NotificationService.js
const Web3 = require('web3');
const contractABI = require('../keys/ContractABI.json');
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

// Assuming you have an Infura endpoint or other node provider
const web3 = new Web3('YOUR_INFURA_ENDPOINT_OR_OTHER_PROVIDER');
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = function(io) {
    contract.events.OrderCreated({
      fromBlock: 'latest'
    })
    .on('data', (event) => {
      console.log('Order Created Event Received:', event);
      io.emit('orderCreated', event.returnValues);
    })
    .on('error', console.error);

    contract.events.OrderAccepted({
      fromBlock: 'latest'
    })
    .on('data', (event) => {
      console.log('Order Accepted Event Received:', event);
      // Emit to a specific room or namespace if needed
      io.emit('orderAccepted', event.returnValues);
    })
    .on('error', console.error);

    // Initialize more listeners as needed
};
