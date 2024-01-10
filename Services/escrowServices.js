const Web3 = require('web3');
const contractABI = require('../contractABI.json'); // Load your contract ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const web3 = new Web3('http://localhost:7545'); // URL of your Ganache
const contract = new web3.eth.Contract(contractABI, contractAddress);

exports.createOrder = async (buyer, seller, amount, serviceType) => {
  const data = contract.methods.createOrder(seller, amount, serviceType).encodeABI();
  // Add logic to send transaction
};

exports.confirmDelivery = async (orderId) => {
  const data = contract.methods.confirmDelivery(orderId).encodeABI();
  // Add logic to send transaction
};

exports.cancelOrder = async (orderId) => {
  const data = contract.methods.cancelOrder(orderId).encodeABI();
  // Add logic to send transaction
};
