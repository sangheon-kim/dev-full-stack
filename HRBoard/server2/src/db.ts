import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_ADDRESS,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Successfully we are connected with the database"))
  .catch(() => {
    console.log(`we have some error while connection with database connection`);
  });

export default sequelize;
