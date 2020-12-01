import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../env") });
import { ApolloServer } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import expressJwt from "express-jwt";
import schema from "./schema";
