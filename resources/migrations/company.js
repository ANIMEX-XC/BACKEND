'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('company', {
      ...ZygoteModel,
      company_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      company_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      company_address: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('company')
  }
}
