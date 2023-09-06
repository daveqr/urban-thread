const jwt = require('jsonwebtoken');

// TODO use env var
const secretKey = 'the_secret_key';

function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
}

module.exports = {
    generateToken,
};
