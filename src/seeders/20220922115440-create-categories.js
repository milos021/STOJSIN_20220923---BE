'use strict';

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      title: 'Exercise',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Education',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Recipe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {}),

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', {[Op.or]: [{title: 'Exercise'}, {title: 'Education'}, {title: 'Recipe'}]});
  }
};
