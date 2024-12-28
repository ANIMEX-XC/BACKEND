'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('product_images', {
      ...ZygoteModel,
      product_image_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      product_image_product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products', // Matches the table name for ProductModel
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_image_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_images')
  }
}
