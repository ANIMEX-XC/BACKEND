'use strict'

const { ZygoteModel } = require('../zygote')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_variants', {
      ...ZygoteModel,
      variant_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onDelete: 'CASCADE'
      },
      variant_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      variant_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      variant_size: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      variant_color: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      variant_category: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_variants')
  }
}
