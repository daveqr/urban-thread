import express from "express";
import passport from "passport";
import AccountController from "./account.controller";

const router = express.Router();
const accountController = new AccountController();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  await accountController.login(req, res);
});

router.get("/logout", async (req, res) => {
  await accountController.logout(req, res);
});

export default router;
