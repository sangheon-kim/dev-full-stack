import path from "path";
import { makeExecutableSchema, mergeTypeDefs, mergeResolvers, loadFilesSync } from "graphql-tools";

const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));

const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.ts"));

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
