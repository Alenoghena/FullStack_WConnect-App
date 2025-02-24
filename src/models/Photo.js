import { sequelize } from "@/utils/database";
import { DataTypes } from "sequelize";
import User from "./User";

const Photo = sequelize.define(
  "Photo",
  {
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: "FOREIGNKEYS",
    },
  },
  { tableName: "photos" }
);

// User.hasOne(Photo, {
//   onDelete: "cascade",
// });
// Photo.belongsTo(User, { targetKey: "id" });

Photo.sync({ alter: true });

export default Photo;

// userId: {
//   type: DataTypes.INTEGER,
//   FOREIGNKEYS: "FOREIGNKEYS",
// },
