const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;

// connection with mysql Database
const sequelize = new Sequelize("test", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_ADDRESS,
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((_: any) => {
    console.log("Successfully we are connected with the database");
  })
  .catch((err: any) => {
    console.log(`we have some error while connection with database connection ${err}`);
  });

export default sequelize;
