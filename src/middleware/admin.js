const { getAuth } = require('../config/firebase');
require('dotenv').config();

// VALIDATE UID TOKEN
const validate = async (req, res, next) => {
    const uid = req.body.Token || null;

    getAuth().verifyIdToken(uid).then((decodedToken) => {
        if (decodedToken.uid === process.env.ADMIN_TOKEN) {
            next();
        } else {
            res.status(401).send({ message: 'Invalid Token.' }).end();
        }
    }).catch((error) => {
        res.status(401).send({ message: 'Invalid Token.' }).end();
    });
}

// EXPORTS
module.exports = {
    validate
}