import passport from 'passport';
import { generateToken } from '../services/jwt.service';
import express, { Request, Response } from 'express';
const router = express.Router();

// Login
router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    // TODO need to implement login
    // const user = req.user;
    // const token = generateToken({ userId: user._id, username: user.username });

    // logger.debug(`User ${user.email} logged in.`);
    // res.json({ message: req.i18n.__('Login successful'), token });
});

// Logout
router.get('/logout', (req: Request, res: Response) => {
    res.json({ message: 'Logout successful' });
});

module.exports = router;
