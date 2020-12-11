// import model from "../../models";
// import User from "../../controllers/common";

// const Query = {
//   user: async (root: any, { id }: any) => {
//     const user = await model.User.findOne({ where: { id } });
//     return user;
//   },
//   users: async () => {
//     const users = await model.User.findAll();
//     return users;
//   },
// };

// const Mutation = {
//   createUser: async (root: any, { input }: { input: any }) => {
//     try {
//       await User.createQuery(input);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   },
// };

// export default {
//   Query,
//   Mutation,
// };
