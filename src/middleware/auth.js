const { getAuth } = require('../config/firebase');

// VALIDATE UID TOKEN
const validate = async (req, res, next) => {
    let auth = req.headers.authorization || null;
    let uid = auth ? auth.split('Bearer ')[1] : null;
    
    getAuth().getUser(uid).then((userRecord) => {
        req.body.UID = uid;
        next();
    }).catch((error) => {
        res.status(401).send('Unauthorized').end();
    });
}

// EXPORTS
module.exports = {
    validate
}