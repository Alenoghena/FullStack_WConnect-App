import { sequelize } from "@/utils/database";
import { DataTypes } from "sequelize";
// import Comment from "./Comment";
// import Like from "./Like";

const Post = sequelize.define(
  "Post",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: "FOREIGNKEYS",
    },
  },
  { tableName: "posts" }
);

Post.associate = (models) => {
  Post.hasMany(models.Comment, {
    onDelete: "cascade",
  });
  Post.hasMany(models.Like, {
    onDelete: "cascade",
  });
  return Post;
};

// Post.hasMany(Comment, {
//   onDelete: "cascade",
// });
// Post.hasMany(Like, {
//   onDelete: "cascade",
// });

Post.sync({ alter: true });
export default Post;

// userId: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
// },

// Post.sync({alter:true}).then(()=>{
//   const post=Post.build({title:'Test', postText:'What is this?',username:'Hudson'});
// console.log(post.title)
// })
