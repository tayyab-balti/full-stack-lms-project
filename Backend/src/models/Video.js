const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Subject = require("./Subject");

const Video = sequelize.define(
  "Video",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  { timestamps: false },
);

// A Subject has many Videos; a Video belongs to one Subject
Subject.hasMany(Video, { foreignKey: "subjectId", onDelete: "CASCADE" });
Video.belongsTo(Subject, { foreignKey: "subjectId" });

module.exports = Video;
