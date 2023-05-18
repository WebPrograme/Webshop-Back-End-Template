const { getAuth } = require('../config/firebase');
require('dotenv').config();

// VALIDATE UID TOKEN
const validate = async (req, res, next) => {
    let header = req.headers.authorization || null;
    let uid = header ? header.split(' ')[1] : null;

    if (!uid) res.status(401).send({ message: 'Invalid Token.' }).end();

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