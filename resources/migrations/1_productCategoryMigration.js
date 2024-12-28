'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('product_categories', {
      ...ZygoteModel,
      product_category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      product_category_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_categories')
  }
}
