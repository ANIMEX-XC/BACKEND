'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('addresses', {
      ...ZygoteModel,
      addressId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      addressUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      addressName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      addressContact: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      addressDetail: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      addressPostalCode: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      addressProvinsi: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      addressKabupaten: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      addressKecamatan: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('addresses')
  }
}
