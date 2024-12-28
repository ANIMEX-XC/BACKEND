'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      ...ZygoteModel,
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      product_image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      product_code: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      product_category: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      product_stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products')
  }
}
