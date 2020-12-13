import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import app from "./server";
import bodyParser from "body-parser";

import appRoutes from "./routes";
const PORT = 8087;
import "./db";

app.use(bodyParser.json());
app.use("/", appRoutes);
// listened request here
app.listen(PORT, () => {
  console.log("App is Running");
});

const array = [1, 2, 3];

const forEachResult = array.forEach((item) => {
  console.log(item);
  return "erin zzang";
});
console.log(forEachResult);

const result = array.map((item) => {
  console.log(item);
  return `erin-${item}`;
});
console.log(result);
