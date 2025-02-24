"use strict";
// const { sequelize, DataTypes } = require("../utils/database");
import { sequelize } from "@/utils/database";
import { DataTypes } from "sequelize";
// // import Photo from "./Photo";
// import Post from "./Post";
// import Like from "./Like";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue:
        "b868072b70a7616b05a3cc54cf0c3a5b535b703fe16fc4312b002992c0784bf9bbc996a9fecb29e7d6f4cdfbf9e3a8d0e0ff639e1594cdff1d128508becb684b",
      allowNull: false,
    },
  },
  { tableName: "users" }
);

User.associate = (models) => {
  User.hasMany(models.Post, {
    onDelete: "cascade",
  });
  User.hasMany(models.Like, {
    onDelete: "cascade",
  });
  User.hasOne(models.Photo, {
    onDelete: "cascade",
  });

  return User;
};

// User.hasMany(Post, {
//   onDelete: "cascade",
// });
// User.hasMany(Like, {
//   onDelete: "cascade",
// });

User.sync({ alter: true });
export default User;
