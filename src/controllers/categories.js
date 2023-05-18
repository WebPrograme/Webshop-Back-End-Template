const categories = require('../services/categories');

// REQUESTS
const get = async (req, res) => { // Get all Categories
    try {
        let status, results;
        categories.get().then((response) => {
            status = response.status;
            results = response.results;
        }).catch((error) => {
            status = error.status;
            results = error.results;
        }).finally(() => {
            res.status(status).send(results);
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
}

// EXPORTS
module.exports = {
    get
}