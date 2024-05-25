const Web3 = require('web3');
const ContractABI = require('./keys/ContractABI.json'); // Adjust the path if necessary
const contractAddress = require('./keys/ContractAddress'); // Adjust the path if necessary

const ganacheUrl = 'http://127.0.0.1:7545';

const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
const contract = new web3.eth.Contract(ContractABI, contractAddress);

async function testConnection() {
  try {
    // Get accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);

    // Check balance of the first account
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

    // Replace `someMethod` with an actual read method from your contract
    // For example, if your contract has a method `getOrderCount`
    // const result = await contract.methods.getOrderCount().call();
    // console.log('Order Count:', result);

    // Testing a write transaction
    const tx = await contract.methods.createOrder('33.6844,73.0479', '33.6844,73.0479').send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
      gas: 3000000,
    });
    console.log('Transaction successful:', tx);

  } catch (error) {
    console.error('Error in testConnection:', error);
  }
}

testConnection();
