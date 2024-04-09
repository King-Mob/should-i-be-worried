const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD ?? "", {
    host: process.env.DATABASE_HOST ?? 'localhost',
    dialect: 'mysql'
});

const TagType = sequelize.define("tag_type", {
    name: {
        type: DataTypes.TEXT
    }
});

module.exports = {
    TagType
}
