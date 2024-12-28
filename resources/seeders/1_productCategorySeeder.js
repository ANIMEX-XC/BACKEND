'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      {
        product_category_id: 1,
        product_category_name: 'Electronics',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_category_id: 2,
        product_category_name: 'Clothing',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_category_id: 3,
        product_category_name: 'Home Appliances',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {})
  }
}
