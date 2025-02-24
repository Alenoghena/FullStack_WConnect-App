import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("nextdb", "root", "Alenoghena@2", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

(async () => {
  try {
    await sequelize.authenticate();

    //Sync defined models to database
    await sequelize.sync({ alter: true }); //this will create tables if they don't exist or update existing ones
    console.log("Connection has been established successfully");

    //You can now start using your models to interact with the database
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
})();
