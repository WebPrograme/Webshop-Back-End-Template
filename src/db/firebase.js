const { db } = require('../config/firebase');

// CLASSES
class Categories { // Categories
    async get() { // Get all Categories
        return new Promise((resolve, reject) => {
            db.ref('Categories').once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                }
                else {
                    resolve({ status: 404, results: 'No Categories found' });
                }
            });
        });
    }
}

class Products { // Products
    async get(id = null) { // Get all Products
        return new Promise((resolve, reject) => {
            let ref;
            if (id) {
                ref = db.ref('Products/' + id);
            } else {
                ref = db.ref('Products');
            }

            ref.once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                } else {
                    reject({ status: 404, results: 'No Products found' });
                }
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }

    async getChild(id, child) { // Get Product Child (By Id)
        return new Promise((resolve, reject) => {
            db.ref('Products/' + id + '/' + child).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                } else {
                    reject({ status: 404, results: 'Product not found' });
                }
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }

    async add(productID, product) { // Add Product (Admin)
        return new Promise((resolve, reject) => {
            db.ref('Products/' + productID).set(product).then(() => {
                resolve({ status: 200, results: 'Product added successfully' });
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }

    async update(productID, product) { // Update Product (Admin)
        return await this.add(productID, product);
    }

    async remove(productID) { // Delete Product (Admin)
        return new Promise((resolve, reject) => {
            db.ref('Products/' + productID).remove().then(() => {
                resolve({ status: 200, results: 'Product deleted successfully' });
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }
}

class Accounts { // Accounts
    async login(uid) { // Login (Auth Needed)
        return new Promise((resolve, reject) => {
            db.ref('Accounts/' + uid).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                }
                else {
                    reject({ status: 404, results: 'Account not found' });
                }
            }).catch((error) => {
                console.log(error);
                reject({ status: 500, results: error });
            });
        });
    }

    async register(uid, account) { // Register
        return new Promise((resolve, reject) => {
            db.ref('Accounts/' + uid).set(account).then(() => {
                resolve({ status: 200, results: 'Account created successfully' });
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }

    async get(uid, target) { // Get (By Target)
        return new Promise((resolve, reject) => {
            db.ref('Accounts/' + uid + '/' + target).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                }
                else {
                    reject({ status: 404, results: 'Target not found' });
                }
            }).catch((error) => {
                reject({ status: 500, results: error });
            });
        });
    }

    async update(uid, target, data) { // Update (By Target)
        return new Promise((resolve, reject) => {
            db.ref('Accounts/' + uid + '/' + target).set(data).then(() => {
                resolve({ status: 200, results: 'Target updated successfully' });
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }
}

class Orders { // Orders
    async getAll() { // Get Orders (Admin)
        return new Promise((resolve, reject) => {
            db.ref('Orders').once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                } else {
                    reject({ status: 404, results: 'No Orders found' });
                }
            }).catch((error) => {
                reject({ status: 500, results: error });
            });
        });
    }

    async getOrder(uid, orderID) { // Get Order - By ID (Admin)
        return new Promise((resolve, reject) => {
            db.ref('Orders/' + uid + '/' + orderID).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                } else {
                    reject({ status: 404, results: 'No Orders found' });
                }
            }).catch((error) => {
                reject({ status: 500, results: error });
            });
        });
    }

    async get(uid) { // Get Orders - By UID (Auth Needed)
        return new Promise((resolve, reject) => {
            db.ref('Orders/' + uid).once('value', (snapshot) => {
                if (snapshot.exists()) {
                    resolve({ status: 200, results: snapshot.val() });
                } else {
                    reject({ status: 404, results: 'No Orders found' });
                }
            }).catch((error) => {
                reject({ status: 500, results: error });
            });
        });
    }

    async add(uid, orderID, order) { // Add Order (Auth Needed)
        return new Promise((resolve, reject) => {
            db.ref('Orders/' + uid + '/' + orderID).set(order).then(() => {
                resolve({ status: 200, results: 'Order added successfully' });
            }).catch((error) => {
                reject({ status: 400, results: error });
            });
        });
    }

    async update(uid, orderID, order) { // Update Order (Auth Needed)
        return await this.add(uid, orderID, order);
    }
}

// EXPORTS
module.exports = {
    Categories: new Categories(),
    Products: new Products(),
    Accounts: new Accounts(),
    Orders: new Orders()
}