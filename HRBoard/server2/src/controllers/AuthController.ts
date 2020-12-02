import { Request, Response } from "express";
import Model from "../models";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../app";
import { makeErrorResponse, makeSucessedResponse } from "../utils";

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  Model.User.findOne({ where: { email, password } })
    .then((result) => {
      if (!!result) {
        // jsonwebtoken 생성한다.
        const token = jwt.sign({ sub: result.id }, jwtSecret);
        makeSucessedResponse({ res, data: { token }, cookie: { accessToken: token, option: { maxAge: 90000, httpOnly: true } } });
      } else {
        res.status(401).json({ status: "Error", message: "ID 비밀번호가 일치하지 않습니다." });
      }
    })
    .catch((err: Error) => {
      makeErrorResponse({ err, res });
    });
};

export default {
  login,
};
