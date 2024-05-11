const Web3  = require('web3');
const contractABI = require('../Services/contractAbi.json');
const db = require('../Config/db'); // Adjust this path as needed
const contractAddress = '0x815923875E5df5351ecC75A4db7Ad9E222555f06';
const web3 = new Web3("http://localhost:7545"); // URL of your Ganache
const contract = new web3.eth.Contract(contractABI, contractAddress);
const accountAddress = '0x815923875E5df5351ecC75A4db7Ad9E222555f06';
const privateKey = '0x024bbebd5095ab2a163024b95e2bd5157f6c7ec90c016a20342dbb9af6831e6c';

exports.createOrder = async (userId, seller, amount, serviceType) => {
    console.log("Service: Creating order", { userId, seller, amount, serviceType });
    try {
        // Blockchain transaction
        console.log("Service: Preparing blockchain transaction for order creation");
        const data = contract.methods.createOrder(seller, amount, serviceType).encodeABI();
        const transaction = {
            from: accountAddress,
            to: contractAddress,
            gas: 2000000,
            gasPrice: await web3.eth.getGasPrice(),
            data: data
        };
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Service: Blockchain transaction receipt", receipt);

        // Database operation
        console.log("Service: Inserting order into database");
        const [order] = await db.execute(
            'INSERT INTO orders (buyer_id, seller, amount, service_type, transaction_id) VALUES (?, ?, ?, ?, ?)',
            [userId, seller, amount, serviceType, receipt.transactionHash]
        );
        return { blockchainReceipt: receipt, orderId: order.insertId };
    } catch (error) {
        console.error("Service: Error in createOrder", error);
        throw error; // Re-throw the error so it can be caught and handled by the controller
    }
};

exports.confirmDelivery = async (orderId) => {
    console.log("Service: Confirming delivery for order", orderId);
    try {
        // Fetch order details from DB
        console.log("Service: Fetching order details from database");
        const [orders] = await db.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (orders.length === 0) {
            throw new Error('Order not found');
        }

        const order = orders[0];

        // Blockchain transaction
        console.log("Service: Preparing blockchain transaction for confirming delivery");
        const data = contract.methods.confirmDelivery(order.transaction_id).encodeABI();
        const transaction = {
            from: accountAddress,
            to: contractAddress,
            gas: 2000000,
            gasPrice: await web3.eth.getGasPrice(),
            data: data
        };
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Update order status in database
        console.log("Service: Updating order status in database");
        await db.execute('UPDATE orders SET status = "confirmed" WHERE order_id = ?', [orderId]);
    } catch (error) {
        console.error("Service: Error in confirmDelivery", error);
        throw error;
    }
};

exports.cancelOrder = async (orderId) => {
    console.log("Service: Cancelling order", orderId);
    try {
        // Fetch order details from DB
        console.log("Service: Fetching order details from database");
        const [orders] = await db.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (orders.length === 0) {
            throw new Error('Order not found');
        }

        const order = orders[0];

        // Blockchain transaction
        console.log("Service: Preparing blockchain transaction for cancelling order");
        const data = contract.methods.cancelOrder(order.transaction_id).encodeABI();
        const transaction = {
            from: accountAddress,
            to: contractAddress,
            gas: 2000000,
            gasPrice: await web3.eth.getGasPrice(),
            data: data
        };
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Update order status in database
        console.log("Service: Updating order status in database");
        await db.execute('UPDATE orders SET status = "canceled" WHERE order_id = ?', [orderId]);
    } catch (error) {
        console.error("Service: Error in cancelOrder", error);
        throw error;
    }
};

exports.fetchOrders = async () => {
    console.log("Service: Fetching all orders");
    try {
        const [rows] = await db.query('SELECT * FROM orders');
        return rows;
    } catch (error) {
        console.error("Service: Error in fetchOrders", error);
        throw error;
    }
    
};
exports.getOrders = async () => {
  try {
      console.log("Service: Fetching all orders from the database");
      const [rows] = await db.query('SELECT * FROM orders');
      return rows;
  } catch (error) {
      console.error("Service: Error in getOrders", error);
      throw error;
  }
};
