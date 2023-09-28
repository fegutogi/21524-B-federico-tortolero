const { sequelize } =require("../../database");
const { DataTypes } = require("sequelize");

const PosteoModel = sequelize.define("posteos", {
    title: DataTypes.TEXT,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
});

module.exports = { PosteoModel }