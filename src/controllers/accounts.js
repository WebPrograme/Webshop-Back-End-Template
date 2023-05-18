const { AccountsService } = require('../services/accounts');

// REQUESTS - LOGIN & REGISTER
class Account {
    async login(req, res) { // Login (Auth Needed)
        try {
            const uid = req.body.UID || null;
            let status, results;
    
            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
    
            AccountsService.login(uid).then((response) => {
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

    async register(req, res) { // Register
        try {
            const uid = req.body.UID || null;
            let account = req.body.Account || null;
            let status, results;
    
            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
    
            account['UID'] = uid;
    
            AccountsService.register(uid, account).then((response) => {
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
}

// REQUESTS - CART
class Cart {
    async get(req, res) { // Get Cart (Auth Needed)
        try {
            const uid = req.body.UID || null;
            let status, results;

            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();

            AccountsService.get(uid, 'Cart').then((response) => {
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

    async update(req, res) { // Update Cart (Auth Needed)
        try {
            const uid = req.body.UID || null;
            const cart = req.body.Cart || null;
            let status, results;

            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
            if (!cart) res.status(400).send({ message: 'Cart is required.' }).end();

            AccountsService.update(uid, 'Cart', cart).then((response) => {
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
}

// REQUESTS - FAVORITES
class Favorites {
    async get(req, res) { // Get Favorites (Auth Needed)
        try {
            const uid = req.body.UID || null;
            let status, results;

            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();

            AccountsService.get(uid, 'Favorites').then((response) => {
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

    async update(req, res) { // Update Favorites (Auth Needed)
        try {
            const uid = req.body.UID || null;
            const favorites = req.body.Favorites || null;
            let status, results;

            if (!uid) res.status(400).send({ message: 'UID is required.' }).end();
            if (!favorites) res.status(400).send({ message: 'Favorites is required.' }).end();

            AccountsService.update(uid, 'Favorites', favorites).then((response) => {
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
}

// EXPORTS
module.exports = {
    Account: new Account(),
    Cart: new Cart(),
    Favorites: new Favorites()
}