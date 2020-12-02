import path from "path";
import http from "http";
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import { ApolloServer } from "apollo-server-express";
import app from "./app";

import schema from "./schema";
import Model from "./models";

import jwt from "jsonwebtoken";
import "./db";

const port = process.env.PORT || 9000;

const apolloServer = new ApolloServer({ schema });

apolloServer.applyMiddleware({ app, path: "/graphql" });
const httpServer = http.createServer(app);
httpServer.listen(port, () => console.info(`http://localhost:${port}`));
