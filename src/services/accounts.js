const { Accounts } = require('../db/firebase');

// REQUESTS
class Account { // Account
    // REQUESTS - LOGIN & REGISTER
    async login(uid) { // Login (Auth Needed)
        return new Promise((resolve, reject) => {
            try {
                Accounts.login(uid).then((response) => {
                    const { status, results } = response;
                    resolve({ status: status, results: results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status: status, results: results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }

    async register(uid, account) { // Register
        return new Promise((resolve, reject) => {
            try {
                Accounts.register(uid, account).then((response) => {
                    const { status, results } = response;
                    resolve({ status: status, results: results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status: status, results: results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }
    
    // REQUESTS - GET (BY TARGET)
    async get(uid, target) { // Get (By Target)
        return new Promise((resolve, reject) => {
            try {
                Accounts.get(uid, target).then((response) => {
                    const { status, results } = response;
                    resolve({ status: status, results: results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status: status, results: results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }

    // REQUESTS - UPDATE (BY TARGET)
    async update(uid, target, data) { // Update (By Target)
        return new Promise((resolve, reject) => {
            try {
                Accounts.update(uid, target, data).then((response) => {
                    const { status, results } = response;
                    resolve({ status: status, results: results });
                }).catch((error) => {
                    const { status, results } = error;
                    reject({ status: status, results: results });
                });
            } catch (error) {
                reject({ status: 500, results: error });
            }
        });
    }
}

// EXPORTS
module.exports = {
    AccountsService: new Account(),
}