'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        product_id: 1,
        product_name: 'Croissant',
        product_category: 'Bakery',
        product_price: 20000,
        product_code: 'CR001',
        product_stock_quantity: 100,
        product_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1MmqlAnokdTSY0U4hsl133BuV6WUa_TFwA&s',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 2,
        product_name: 'Baguette',
        product_category: 'Bakery',
        product_price: 40000,
        product_code: 'BG002',
        product_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFW-iRAlYm42PA0l0Zh3KFMt9NOdwV05b7XA&s',
        product_stock_quantity: 150,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 3,
        product_name: 'Sourdough Bread',
        product_category: 'Bakery',
        product_price: 50000,
        product_code: 'SD003',
        product_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemQmXnk8UCJG6aWRuvIO0iSBGtAAzs8CJFg&s',
        product_stock_quantity: 80,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 4,
        product_name: 'Ciabatta',
        product_category: 'Bakery',
        product_price: 34900,
        product_code: 'CB004',
        product_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8--0ACVz9TAwazD5jV7bEwOFJJ8pD2XmzCw&s',
        product_stock_quantity: 120,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 5,
        product_name: 'Focaccia',
        product_category: 'Bakery',
        product_price: 34000,
        product_code: 'FC005',
        product_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtPxvl3flA0DYIfvNaTCkCiBUEXQ6Ks_6oDg&s',
        product_stock_quantity: 90,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
