'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      ...ZygoteModel,
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_contact: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_role: {
        type: DataTypes.ENUM('superAdmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      user_level: {
        type: DataTypes.ENUM('silver', 'gold', 'platinum'),
        allowNull: false,
        defaultValue: 'silver'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users')
  }
}
