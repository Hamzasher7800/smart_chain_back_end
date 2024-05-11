import Web3 from 'web3';
const bscTestnetUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
const web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetUrl));



// Call the initWeb3 function to initialize web3
initWeb3();

export default web3;
