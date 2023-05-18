const { Products } = require('../db/firebase');

// REQUESTS
const get = async (id = null) => { // Get Products (All OR By Id)
    return new Promise(async (resolve, reject) => {
        try {
            Products.get(id).then((response) => {
                const { status, results } = response;
                resolve({ status: status, results: results });
            }).catch((error) => {
                const { status, results } = error;
                reject({ status: status, results: results });
            });
        }
        catch (error) {
            reject({ status: 400, results: error });
        }
    });
}

const add = async (productID, product) => { // Add Product (Admin)
    return new Promise(async (resolve, reject) => {
        try {
            Products.add(productID, product).then((response) => {
                const { status, results } = response;
                resolve({ status: status, results: results });
            }).catch((error) => {
                const { status, results } = error;
                reject({ status: status, results: results });
            });
        }
        catch (error) {
            reject({ status: 400, results: error });
        }
    });
}

const update = async (productID, product) => { // Update Product (Admin)
    return new Promise(async (resolve, reject) => {
        try {
            Products.update(productID, product).then((response) => {
                const { status, results } = response;
                resolve({ status: status, results: results });
            }).catch((error) => {
                const { status, results } = error;
                reject({ status: status, results: results });
            });
        }
        catch (error) {
            reject({ status: 400, results: error });
        }
    });
}

const updateStock = async (order) => { // Update Product Stock (Admin)
    return new Promise(async (resolve, reject) => {
        try {
            order['Products'].forEach(async (product) => {
                Products.get(product['ID']).then(async (response) => {
                    const orderSizes = Object.keys(product['Sizes']);
                    let productData = response['results'];
                    let promises = [];
                    
                    orderSizes.forEach(async (size) => {
                        if (parseInt(productData['Sizes'][size]['Stock']) >= parseInt(product['Sizes'][size]['Quantity'])) {
                            productData['Sizes'][size]['Stock'] -= product['Sizes'][size]['Quantity'];
                            productData['Sold'] += product['Sizes'][size]['Quantity'];

                            promises.push(
                                new Promise(async (resolve, reject) => {
                                    await Products.update(product['ID'], productData).then((response) => {
                                        const { status, results } = response;
                                        resolve({ status: status, results: results });
                                    }).catch((error) => {
                                        const { status, results } = error;
                                        reject({ status: status, results: results });
                                    });
                                })
                            );
                        } else {
                            reject({ status: 400, results: 'Not enough stock for ' + product['Name'] + ' in size ' + size });
                        }
                    });

                    Promise.all(promises).then((response) => {
                        resolve({ status: 200, results: 'Product stock updated successfully' });
                    }).catch((error) => {
                        console.log(error);
                        reject({ status: 400, results: error });
                    });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status: status, results: results });
                });
            });
        }
        catch (error) {
            reject({ status: 400, results: error });
        }
    });
}

const remove = async (productID) => { // Delete Product (Admin)
    return new Promise(async (resolve, reject) => {
        try {
            Products.remove(productID).then((response) => {
                const { status, results } = response;
                resolve({ status: status, results: results });
            }).catch((error) => {
                const { status, results } = error;
                reject({ status: status, results: results });
            });
        }
        catch (error) {
            reject({ status: 400, results: error });
        }
    });
}

// EXPORTS
module.exports = {
    get,
    add,
    update,
    remove,
    updateStock
}