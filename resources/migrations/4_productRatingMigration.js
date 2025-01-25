'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('product_ratings', {
      ...ZygoteModel,
      product_rating_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      product_rating_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      product_rating_product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products', // Matches the table name for ProductModel
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_rating_start: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_rating_description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_ratings')
  }
}
