import model from "../../models";
import AuthService from "../../services/AuthService";
import async from "../../utils/asyncLib";
import ValidationParams from "../../utils/validationParams";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../app";

const Query = {
  user: async (root: any, { id }: any) => {
    const user = await model.User.findOne({ where: { id } });
    return user;
  },
  users: async () => {
    const users = await model.User.findAll();
    return users;
  },
};

const Mutation = {
  createUser: async (root: any, { input }: { input: any }) => {
    try {
      let result = await ValidationParams.validParams(input);
      result = await ValidationParams.validEmail(result);
      result = await AuthService.emailDuplicateCheck(result);
      result = await AuthService.hashPassword(result);
      result = await AuthService.createUser(result);
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async (root: any, { input }: { input: any }) => {
    try {
      let data = await ValidationParams.validParams(input);
      data = await ValidationParams.validEmail(data);
      data = await AuthService.hashPassword(data);
      data = await AuthService.matchUser(data);

      const token = jwt.sign({ sub: data.id }, jwtSecret);
      const params = {
        ...data["result"],
        accessToken: token,
      };

      return params;
    } catch (err) {
      console.error("Error", err);
      throw new Error(err);
    }
  },
};

export default {
  Query,
  Mutation,
};
