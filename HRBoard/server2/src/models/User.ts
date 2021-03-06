import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(300),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "User",
    timestamps: false,
    sequelize,
  }
);

export default User;

sequelize.sync();
