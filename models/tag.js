const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD ?? "", {
    host: process.env.DATABASE_HOST ?? 'localhost',
    dialect: 'mysql'
});

const Tag = sequelize.define("tag", {
    image_id: {
        type: DataTypes.INTEGER
    },
    tag_type_id: {
        type: DataTypes.INTEGER
    },
});

module.exports = {
    Tag
}
