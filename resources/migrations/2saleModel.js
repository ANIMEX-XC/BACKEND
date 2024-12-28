'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('sales', {
      ...ZygoteModel,
      sale_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      sale_code: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      sale_deliver_company_name: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      sale_deliver_company_address: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      sale_platform_name: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      sale_tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      sale_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      sale_delivery_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      sale_total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      sale_payment_method: {
        type: DataTypes.ENUM('cash', 'credit_card'),
        allowNull: false
      },
      sale_po: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      sale_order_status: {
        type: DataTypes.ENUM('waiting', 'process', 'cancel', 'done'),
        allowNull: true,
        defaultValue: 'waiting'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales')
  }
}
