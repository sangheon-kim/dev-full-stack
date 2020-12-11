import { Response } from "express";

export const makeErrorResponse = ({
  err,
  res,
  message,
  clientError,
}: {
  err: Error;
  res: Response;
  message?: string;
  clientError?: boolean;
}) => {
  res.status(!!clientError ? 400 : 500).json({
    status: "Error",
    message: !!message ? message : err.message,
  });
};

export const makeSucessedResponse = ({
  res,
  data,
  message,
  cookie,
}: {
  res: Response;
  data?: { [key: string]: any };
  message?: string;
  cookie?: { [key: string]: any };
}) => {
  let result = {};
  let defaultRes = {
    status: "OK",
    message: !message ? "Success" : message,
  };

  result = !!data ? { ...defaultRes, data } : defaultRes;
  if (cookie) {
    res.cookie(Object.keys(cookie)[0], cookie[Object.keys(cookie)[0]], cookie["option"]);
    res.status(200).json(result);
  } else {
    res.status(200).json(result);
  }
};

export const makeResponse = (err: Error, res: Response, data: any) => {
  if (err) {
    // console.error(err);
    return makeErrorResponse({ err, res });
  }

  makeSucessedResponse({ res, data });
};
