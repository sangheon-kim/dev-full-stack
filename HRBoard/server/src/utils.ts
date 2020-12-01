import { Response } from "express";

export const makeErrorResponse = ({ err, res, message }: { err: Error; res: Response; message?: string }) => {
  res.status(!!message ? 400 : 500).json({
    status: "Error",
    message: !!message ? message : err,
  });
};

export const makeSucessedResponse = ({ res, data, message }: { res: Response; data?: { [key: string]: any }; message?: string }) => {
  let result = {};
  let defaultRes = {
    status: "OK",
    message: !message ? "Success" : message,
  };

  result = !!data ? { ...defaultRes, data } : defaultRes;

  res.status(200).json(result);
};

export const makeResponse = (err: Error, res: Response, data: any) => {
  if (err) {
    console.error(err);
    return makeErrorResponse({ err, res });
  }

  makeSucessedResponse({ res, data });
};
