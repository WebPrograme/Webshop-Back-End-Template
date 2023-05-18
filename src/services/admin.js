const { Orders } = require('../db/firebase');

// REQUESTS - ORDERS
class OrdersService {
    async get() { // Get Orders - By UID (Auth Needed)
        return new Promise((resolve, reject) => {
            try {
                Orders.getAll().then((response) => {
                    const { status, results } = response;
                    resolve({ status, results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status, results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }

    async getOrder(uid, orderID) { // Get Order - By ID (Admin)
        return new Promise((resolve, reject) => {
            try {
                Orders.getOrder(uid, orderID).then((response) => {
                    const { status, results } = response;
                    resolve({ status, results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status, results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }

    async update(uid, orderID, order) { // Update Order (Auth Needed)
        return new Promise((resolve, reject) => {
            try {
                Orders.update(uid, orderID, order).then((response) => {
                    const { status, results } = response;
                    resolve({ status, results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status, results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }
}

// EXPORTS
module.exports = {
    OrdersService: new OrdersService()
}