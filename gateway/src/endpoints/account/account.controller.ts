import { Request, Response } from "express";

export default class AccountController {
  async login(req: Request, res: Response) {
    try {
      // const user = req.user;
      // const token = generateToken({ userId: user._id, username: user.username });
      // logger.debug(`User ${user.email} logged in.`);
      // res.json({ message: req.i18n.__('Login successful'), token });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: "Failed to logout" });
    }
  }
}
