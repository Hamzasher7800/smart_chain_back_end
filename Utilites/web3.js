const Web3 = require('web3');
const ganacheUrl = 'http://127.0.0.1:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
module.exports = web3;

