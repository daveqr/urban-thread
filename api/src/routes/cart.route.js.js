const express = require('express');
const router = express.Router();
const passport = require('passport');

// TODO placeholder to demonstrate jwt authentication
router.get('/cart', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'OK' });
});

module.exports = router;
