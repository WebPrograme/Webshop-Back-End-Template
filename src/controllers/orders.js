const orders = require('../services/orders');
const products = require('../services/products');
const { AccountsService } = require('../services/accounts');

// REQUESTS
const get = async (req, res) => { // Get Orders - By UID (Auth Needed)
    try {
        const uid = req.body.UID || null;
        let status, results;

        if (!uid) res.status(400).send({ message: 'UID is required.' }).end();

        orders.get(uid).then((response) => {
            status = response.status;
            results = response.results;
        }).catch((error) => {
            status = error.status;
            results = error.results;
        }).finally(() => {
            res.status(status).send(results);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const add = async (req, res) => { // Add Order (Auth Needed)
    try {
        const uid = req.body.UID || null;
        const order = req.body.Order;
        const shipment = req.body.Shipment;
        const payment = req.body.Payment;
        const price = req.body.Price;

        if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
        if (!order) res.status(400).send({ message: 'Order is required.' }).end();
        if (!shipment) res.status(400).send({ message: 'Shipment is required.' }).end();
        if (!payment) res.status(400).send({ message: 'Payment is required.' }).end();
        if (!price) res.status(400).send({ message: 'Price is required.' }).end();

        products.updateStock(order).then((response) => {
            orders.add(uid, order, shipment, payment, price).then(async (response) => {
                AccountsService.update(uid, 'Cart', {}).then((response) => {
                    res.status(200).send('Order added successfully').end();
                }).catch((error) => {
                    res.status(error.status).send(error.results).end();
                });
            }).catch((error) => {
                res.status(error.status).send(error.results).end();
            });
        }).catch((error) => {
            res.status(error.status).send(error.results).end();
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

// EXPORTS
module.exports = {
    get,
    add
}