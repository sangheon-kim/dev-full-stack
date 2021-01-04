import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../db";

class LCP extends Model {
  public id!: number;
  public serviceId!: string;
  public detailUrl!: string;
  public duration!: string;
  public loadTime!: string;
  public renderTime!: string;
  public size!: string;
  public startTime!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

LCP.init(
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
    loadTime: {
      type: DataTypes.STRING(100),
    },
    renderTime: {
      type: DataTypes.STRING(100),
    },
    size: {
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
    tableName: "Lcp",
    timestamps: false,
    sequelize,
  }
);

export default LCP;

sequelize.sync();
