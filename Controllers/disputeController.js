const {escrowContract} =require ("../Utilites/web3");
require('dotenv').config();

exports.resolveDispute = async (req, res) => {
    const { orderId, favorServiceProvider } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        const receipt = await escrowContract.methods.resolveDispute(orderId, favorServiceProvider)
                                    .send({ from: accounts[0], gas: 500000 });

        res.json({ message: 'Dispute resolved successfully', transactionHash: receipt.transactionHash });
    } catch (error) {
        console.error('Error resolving dispute:', error);
        res.status(500).send('Error resolving dispute');
    }
};
