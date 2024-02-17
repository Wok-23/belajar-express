'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Beef',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chicken',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sea Food',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ice Drinks',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hot Drinks',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
