import { sequelize } from "@/utils/database";
import { DataTypes } from "sequelize";

const Like = sequelize.define(
  "Like",
  {
    likeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: "FOREIGNKEYS",
    },
    postId: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: "FOREIGNKEYS",
    },
  },
  { tableName: "likes" }
);

Like.sync({ alter: true });

export default Like;

// module.exports = Like;
// module.exports = (sequelize, DataTypes) => {
//   const Like = sequelize.define("Like");
//   return Like;
// };

// userId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
// },
// postId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
// },
