import express from "express";
const router = express.Router();

import Auth from "./controllers/AuthController2";
router.post("/user", Auth.join);
router.post("/login", Auth.login);

export default router;
