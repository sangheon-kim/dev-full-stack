import express, { Request, Response } from "express";
const router = express.Router();

import Auth from "./controllers/AuthController";
router.post("/user", Auth.join);
router.post("/login", Auth.login);

import Static from "./controllers/StaticController";
router.post("/statics", Static.stackService);

import Service from "./controllers/ServiceController";
router.post("/service", Service.createService);
router.get("/services", Service.getServices);
router.get("/service/:id", Service.getService);
router.put("/service", Service.updateService);
router.delete("/service/:id", Service.deleteService);

export default router;
