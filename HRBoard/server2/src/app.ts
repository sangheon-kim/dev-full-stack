import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "morgan";
import expressJwt from "express-jwt";
import routes from "./routes";

export const jwtSecret = Buffer.from(process.env.JWT_SECRET as string, "base64");
const app = express();

app.use(
  // Cross-Origin 이슈 해결
  cors(),
  // 클라이언트로부터 오는 요청에서 body값을 json형식으로 변환하여 받아줌.
  bodyParser.json(),
  // 로그 확인
  logger("dev"),
  // 세션 관리 모듈
  expressJwt({
    secret: jwtSecret,
    algorithms: ["sha1", "RS256", "HS256"],
    credentialsRequired: false,
  })
);

app.use("/", routes);

export default app;
