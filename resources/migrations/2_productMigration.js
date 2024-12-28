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
      product_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      product_category_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      product_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      product_weight: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      product_colors: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_sizes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_transaction_type: {
        type: DataTypes.ENUM('Sell', 'Auction', 'Barter', 'PurchaseOrder'),
        allowNull: false,
        defaultValue: 'Sell'
      }
    })
  },

  async down(queryInterface) {
    // Remove the foreign key before dropping the table
    await queryInterface.removeConstraint('products', 'fk_products_product_category_id')
    await queryInterface.dropTable('products')
  }
}
