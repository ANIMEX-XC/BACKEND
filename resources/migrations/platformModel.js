'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('platform', {
      ...ZygoteModel,
      platform_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      platform_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('platform')
  }
}
