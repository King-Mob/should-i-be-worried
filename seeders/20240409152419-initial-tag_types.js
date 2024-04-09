'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tag_types',
      [
        {
          name: 'funny',
        },
        {
          name: 'complaints',
        },
        {
          name: 'celebs',
        },
        {
          name: 'compliments',
        },
        {
          name: 'symptoms',
        },
        {
          name: 'bummer',
        },
        {
          name: 'looking for someone',
        },
        {
          name: 'unintelligible',
        },
        {
          name: 'question',
        },
        {
          name: 'not question',
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tag_types', null, {});
  }
};
