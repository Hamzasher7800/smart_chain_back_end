// BlockchainService.js
const Web3 = require('web3');
const contractABI = require('../keys/ContractABI.json');
const contractAddress = "YOUR_CONTRACT_ADDRESS_ON_BSC_TESTNET";
const bscTestnetUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
const web3 = new Web3(bscTestnetUrl);
const contract = new web3.eth.Contract(contractABI, contractAddress);


const BlockchainService = {
  // Function to create a new order
  createOrder: async (coordinates, serviceType, amount, fromAddress) => {
    try {
      const transaction = contract.methods.createOrder(coordinates, serviceType);
      const gas = await transaction.estimateGas({from: fromAddress});
      const gasPrice = await web3.eth.getGasPrice();
      const data = transaction.encodeABI();

      // This is a simplification. In a real application, you might use a server-side wallet
      // or have the user sign the transaction in the frontend using their own wallet.
      const signedTx = await web3.eth.accounts.signTransaction({
        to: contractAddress,
        data,
        gas,
        gasPrice,
        value: web3.utils.toWei(amount.toString(), 'ether'),
      }, 'PRIVATE_KEY_OF_SENDING_ACCOUNT');

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      return receipt;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },

  // Function to accept an order
  acceptOrder: async (orderId, fromAddress) => {
    try {
      const transaction = contract.methods.acceptOrder(orderId);
      const gas = await transaction.estimateGas({from: fromAddress});
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(fromAddress, 'latest'); // Get nonce
      const data = transaction.encodeABI();

      // Use environment variable for private key or secure key management solution
      const privateKey = process.env.PRIVATE_KEY; 

      const signedTx = await web3.eth.accounts.signTransaction({
        to: contractAddress,
        data,
        gas,
        gasPrice,
        nonce,
        value: 0, // Accept order might not need additional value sent
      }, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log('Order accepted successfully', receipt);
      return receipt;
    } catch (error) {
      console.error('Accepting order failed:', error);
      throw error;
    }
  },

  // Hypothetical function to cancel an order
  cancelOrder: async (orderId, fromAddress) => {
    // Similar structure to acceptOrder
    // Remember to adjust the smart contract method and parameters as necessary
  },

  // Add other contract interaction functions as needed...
};

module.exports = BlockchainService;