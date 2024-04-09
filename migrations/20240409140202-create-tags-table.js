'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "images",
          key: "id"
        }
      },
      tag_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tag_types",
          key: "id"
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tags');
  }
};
