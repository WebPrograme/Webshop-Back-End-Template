const { Categories } = require('../db/firebase');

// REQUESTS
const get = async () => { // Get all Categories
    return new Promise(async (resolve, reject) => {
        try {
            Categories.get().then((response) => {
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
    get
}