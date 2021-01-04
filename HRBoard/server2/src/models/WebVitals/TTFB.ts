import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../db";

class TTFB extends Model {
  public id!: number;
  public serviceId!: string;
  public detailUrl!: string;
  public domComplete!: string;
  public domContentLoadedEventEnd!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

TTFB.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.STRING(100),
    },
    detailUrl: {
      type: DataTypes.STRING(100),
    },
    domComplete: {
      type: DataTypes.STRING(100),
    },
    domContentLoadedEventEnd: {
      type: DataTypes.STRING(100),
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
    tableName: "Ttfb",
    timestamps: false,
    sequelize,
  }
);

export default TTFB;

sequelize.sync();
