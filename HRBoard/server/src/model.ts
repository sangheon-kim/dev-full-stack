// const Sequelize = require("sequelize");
import { Model, DataTypes } from "sequelize";
// const { DataTypes, Model } = Sequelize;
import sequelize from "./db";

// create model => First way to create models in sequelize
// export const User = sequelize.define(
//   "tbl_users",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     rollNo: {
//       type: DataTypes.INTEGER,
//     },
//     status: {
//       type: DataTypes.ENUM("1", "0"),
//       defaultValue: 1,
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//     updated_at: {
//       type: DataTypes.DATE,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     },
//   },
//   { sequelize, modelName: "User", timestamps: false }
// );

// USER MODEL
class User extends Model {}
User.init(
  {
    // parameters
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    rollNo: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: "1",
    },
  },
  {
    timestamps: false,
    modelName: "tbl_users",
    sequelize,
  }
);

// Book MODEL
class Book extends Model {}
Book.init(
  {
    // parameters
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    modelName: "tbl_books",
    sequelize,
  }
);

sequelize.sync();

export default {
  User,
};
