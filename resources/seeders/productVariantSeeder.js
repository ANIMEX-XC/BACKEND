'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_variants', [
      {
        variant_id: 1,
        product_id: 1, // Croissant
        variant_name: 'Combo',
        variant_price: 15000,
        variant_size: 'Medium',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        variant_id: 2,
        product_id: 1, // Croissant
        variant_name: 'Large',
        variant_price: 20000,
        variant_size: 'Large',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        variant_id: 3,
        product_id: 2, // Baguette
        variant_name: 'Small',
        variant_price: 30000,
        variant_size: 'Small',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        variant_id: 4,
        product_id: 3, // Sourdough Bread
        variant_name: 'Combo',
        variant_price: 48000,
        variant_size: 'Medium',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        variant_id: 5,
        product_id: 4, // Ciabatta
        variant_name: 'Jumbo',
        variant_price: 40000,
        variant_size: 'Extra Large',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        variant_id: 6,
        product_id: 5, // Focaccia
        variant_name: 'Medium',
        variant_price: 35000,
        variant_size: 'Medium',
        variant_color: null,
        variant_category: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_variants', null, {})
  }
}
