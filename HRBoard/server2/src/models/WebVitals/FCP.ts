import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../db";

class FCP extends Model {
  public id!: number;
  public serviceId!: string;
  public detailUrl!: string;
  public duration!: string;
  public startTime!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

FCP.init(
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
    duration: {
      type: DataTypes.STRING(100),
    },
    startTime: {
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
    tableName: "Fcp",
    timestamps: false,
    sequelize,
  }
);

export default FCP;

sequelize.sync();
