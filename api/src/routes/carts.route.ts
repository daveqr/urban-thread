import express, { Router } from 'express';
import passport from 'passport';

const router = Router();

// TODO placeholder to demonstrate jwt authentication
router.get('/cart', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: 'OK' });
});

module.exports = router;
