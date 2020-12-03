import express from "express";
const router = express.Router();

import User from "./controllers/UserController";
router.post("/user", User.createUserRest);

import Auth from "./controllers/AuthController";
router.post("/login", Auth.login);

export default router;
