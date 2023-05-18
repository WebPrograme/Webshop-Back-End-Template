const { OrdersService } = require('../services/admin');
const { getAuth } = require('../config/firebase');

// REQUESTS - ADMIN
class Admin {
    async login(req, res) { // Login (Admin)
        try {
            getAuth().verifyIdToken(req.body.Token).then((decodedToken) => {
                if (decodedToken.uid === process.env.ADMIN_TOKEN) {
                    res.status(200).json({User: decodedToken, Token: req.body.Token})
                } else {
                    res.status(401).send({ message: 'Invalid Token.' }).end();
                }
            }).catch((error) => {
                res.status(401).send({ message: 'Invalid Token.' }).end();
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

// REQUESTS - ORDERS
class Orders {
    async get(req, res) { // Get Orders (Admin)
        try {
            OrdersService.get().then((response) => {
                res.status(200).send(response.results).end();
            }).catch((error) => {
                res.status(error.status).send(error.results).end();
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async update(req, res) { // Update Order (Auth Needed)
        try {
            const uid = req.body.UID || null;
            const token = req.body.Token || null;
            const order = req.body.Order;
            const orderID = req.body.OrderID;

            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
            if (!token) res.status(400).send({ message: 'Token is required.' }).end();
            if (!order) res.status(400).send({ message: 'Order is required.' }).end();
            if (!orderID) res.status(400).send({ message: 'OrderID is required.' }).end();

            OrdersService.update(uid, orderID, order).then((response) => {
                res.status(200).send('Order updated successfully').end();
            }).catch((error) => {
                res.status(error.status).send(error.results).end();
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

// EXPORTS
module.exports = {
    Orders: new Orders(),
    Admin: new Admin()
}