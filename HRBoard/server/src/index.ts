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
