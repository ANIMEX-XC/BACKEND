'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sale_items', {
      ...ZygoteModel,
      sale_item_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      sale_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'sales',
          key: 'sale_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      sale_item_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sale_item_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      sale_item_subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sale_items')
  }
}
