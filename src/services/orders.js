const { Orders, Products } = require('../db/firebase');

// REQUESTS
const get = async (uid) => { // Get Orders - By UID (Auth Needed)
    return new Promise((resolve, reject) => {
        try {
            Orders.get(uid).then((response) => {
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

const add = async (uid, order, shipment, payment, totalPrice) => { // Add Order (Auth Needed)
    return new Promise((resolve, reject) => {
        try {
            let products = [];
            let promises = [];

            for (let i = 0; i < order.Products.length; i++) {
                let promise = new Promise((resolve, reject) => {
                    let price = 0;

                    Products.getChild(order.Products[i]['ID'], 'Price').then((response) => {
                        price = response.results;

                        products.push({
                            ID: order.Products[i]['ID'],
                            Name: order.Products[i].Name,
                            Price: price,
                            Sizes: order.Products[i].Sizes,
                        });

                        resolve();
                    });
                });

                promises.push(promise);
            }

            Promise.all(promises).then(() => {
                order.Products = products;

                order.Date = new Date().toLocaleDateString();
                order.Time = new Date().toLocaleTimeString();
                order.Status = 'Pending';
                order.ID = order.Date.replaceAll('/', '') + order.Time.replaceAll(':', '').replace('AM', '').replace('PM', '').trim();

                let orderDetails = {
                    ...order,
                    Shipment: shipment,
                    Price: totalPrice,
                    Payment: payment,
                }

                Orders.add(uid, order.ID, orderDetails).then((response) => {
                    const { status, results } = response;
                    resolve({ status, results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status, results });
                });
            });
        } catch (error) {
            reject({ status: 500, results: error });
        }
    });
}

// EXPORTS
module.exports = {
    get,
    add
}