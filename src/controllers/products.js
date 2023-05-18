const products = require('../services/products');

// REQUESTS
const get = async (req, res) => { // Get Products (All OR By Id)
    try {
        const id = req.query.id || req.params.id || null;
        let status, results;

        products.get(id).then((response) => {
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

const add = async (req, res) => { // Add Product (Admin)
    try {
        const product = req.body.Product;
        const productID = req.body.ProductID;
        let status, results;

        if (!productID) res.status(400).send({ message: 'ProductID is required.' }).end();

        products.add(productID, product).then((response) => {
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

const update = async (req, res) => { // Update Product (Admin)
    try {
        const product = req.body.Product;
        const productID = req.body.ProductID;
        let status, results;

        if (!productID) res.status(400).send({ message: 'ProductID is required.' }).end();

        products.update(productID, product).then((response) => {
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

const remove = async (req, res) => { // Remove Product (Admin)
    try {
        const productID = req.body.ProductID;
        let status, results;

        if (!productID) res.status(400).send({ message: 'ProductID is required.' }).end();

        products.remove(productID).then((response) => {
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

// EXPORTS
module.exports = {
    get,
    add,
    update,
    remove
}