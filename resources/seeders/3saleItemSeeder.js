'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sale_items', [
      {
        sale_item_id: 1,
        sale_id: 1,
        product_id: 1,
        sale_item_quantity: 2,
        sale_item_price: 50.0,
        sale_item_subtotal: 100.0
      },
      {
        sale_item_id: 2,
        sale_id: 1,
        product_id: 2,
        sale_item_quantity: 1,
        sale_item_price: 49.99,
        sale_item_subtotal: 49.99
      },
      {
        sale_item_id: 3,
        sale_id: 2,
        product_id: 3,
        sale_item_quantity: 3,
        sale_item_price: 25.0,
        sale_item_subtotal: 75.0
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sale_items', null, {})
  }
}
