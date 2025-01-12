'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('notifications', {
      ...ZygoteModel,
      notificationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      notificationName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      notificationMessage: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('notifications')
  }
}
