import { Request, Response } from "express";

import { makeErrorResponse, makeSucessedResponse } from "../utils";
import { user } from "./common";

interface ICreateUserInput {
  name: String;
  email: String;
  password?: String;
}

async function createQuery(request: ICreateUserInput) {
  return user.create(request);
}

const createUserRest = async (req: Request, res: Response) => {
  try {
    await createQuery(req.body);
    makeSucessedResponse({ res });
  } catch (err) {
    makeErrorResponse({ res, err });
  }
};

export default {
  createUserRest,
  createQuery,
};
