"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alter `FinishDate` column to allow NULL values
    await queryInterface.changeColumn("ToDos", "FinishDate", {
      type: Sequelize.STRING,
      allowNull: true, // Allow NULL values
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert `FinishDate` column to disallow NULL values (original state)
    await queryInterface.changeColumn("ToDos", "FinishDate", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
