'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        product_id: 1,
        product_user_id: 1,
        product_name: 'Product A',
        product_description: 'A high-quality product for everyday use.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 29.99,
        product_weight: 1.5,
        product_colors: 'Red, Blue',
        product_sizes: 'M, L, XL',
        product_transaction_type: 'Sell',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 2,
        product_user_id: 2,
        product_name: 'Product B',
        product_description: 'A luxury item designed for special occasions.',
        product_category_id: 2, // Ensure this corresponds to an existing category ID
        product_price: 199.99,
        product_weight: 2.0,
        product_colors: 'Gold, Silver',
        product_sizes: 'S, M, L',
        product_transaction_type: 'Auction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 3,
        product_user_id: 3,
        product_name: 'Product C',
        product_description: 'A practical product for professionals.',
        product_category_id: 3, // Ensure this corresponds to an existing category ID
        product_price: 49.99,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
