import express, { Request, Response } from "express";
const router = express.Router();

import Auth from "./controllers/AuthController";
router.post("/user", Auth.join);
router.post("/login", Auth.login);

router.post("/statics", (req: Request, res: Response) => {
  console.log(req.body);
});

import Service from "./controllers/ServiceController";
router.post("/service", Service.createService);
router.get("/services", Service.getServices);
router.get("/service/:id", Service.getService);

export default router;
