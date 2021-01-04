import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../db";

enum Status {
  "sold_out",
  "processing",
}

class Book extends Model {
  public id!: number;
  public name!: string;
  public amount!: number;
  public status!: Status;
  public created_at!: Date;
  public updated_at!: Date;
}

Book.init(
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
    amount: {
      type: DataTypes.INTEGER(),
    },
    status: {
      type: DataTypes.ENUM("0", "1"),
      defaultValue: 1,
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
    tableName: "Book",
    timestamps: false,
    sequelize,
  }
);

export default Book;

sequelize.sync();
