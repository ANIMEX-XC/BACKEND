'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bids', {
      ...ZygoteModel,
      bid_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      bid_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bid_auction_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'auctions',
          key: 'auction_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bid_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      bid_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('bids')
  }
}
