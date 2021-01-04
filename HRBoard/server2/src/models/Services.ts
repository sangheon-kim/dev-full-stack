import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

class Services extends Model {
  public id!: number;
  public name!: string;
  public url!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Services.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false,
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
    tableName: "Services",
    timestamps: false,
    sequelize,
  }
);

export default Services;

sequelize.sync();
