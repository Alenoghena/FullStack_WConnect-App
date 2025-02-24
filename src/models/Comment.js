import { sequelize } from "@/utils/database";
import { DataTypes } from "sequelize";
const Comment = sequelize.define(
  "Comment",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: "FOREIGNKEYS",
    },
  },
  { tableName: "comments" }
);
Comment.sync({ alter: true });
export default Comment;

// postId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
// },
