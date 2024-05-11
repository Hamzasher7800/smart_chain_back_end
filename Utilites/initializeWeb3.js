const Web3 = require('web3');

const initializeWeb3 = () => {
    const { BSC_TESTNET_URL } = process.env;
    if (!BSC_TESTNET_URL) {
        console.error('Binance Smart Chain Testnet URL not defined in .env');
        throw new Error('Missing BSC Testnet URL');
    }
    return new Web3(BSC_TESTNET_URL);
};

module.exports = initializeWeb3;
