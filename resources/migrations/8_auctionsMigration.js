'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('auctions', {
      ...ZygoteModel,
      auction_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      auction_product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      auction_start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      auction_end_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      auction_status: {
        type: DataTypes.ENUM('active', 'closed', 'cancelled'),
        allowNull: false,
        defaultValue: 'active'
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('auctions')
  }
}
