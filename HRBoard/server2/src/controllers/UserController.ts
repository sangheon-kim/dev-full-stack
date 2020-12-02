import { Request, Response } from "express";
import Model from "../models";
import { makeErrorResponse, makeSucessedResponse } from "../utils";

const createUser = (req: Request, res: Response) => {
  Model.User.create(req.body)
    .then(() => makeSucessedResponse({ res }))
    .catch((err: Error) => makeErrorResponse({ err, res }));
};

export default {
  createUser,
};
