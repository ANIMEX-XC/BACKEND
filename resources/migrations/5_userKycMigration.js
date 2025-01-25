'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_kyc', {
      ...ZygoteModel,
      user_kyc_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_kyc_user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      user_kyc_ktp_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_kyc_selfie_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_kyc_real_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_kyc_address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_kyc_date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_kyc')
  }
}
