import express from 'express';
import passport from 'passport';
import CartController from './cart.controller';

const router = express.Router();
const cartController = new CartController();

router.use(passport.authenticate('jwt', {session: false}));

// Route to et cart
router.get('/cart', async (req, res) => {
    await cartController.getCart(req, res);
});

export default router;
