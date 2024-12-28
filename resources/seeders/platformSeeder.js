'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('platform', [
      {
        platform_id: 1, // Updated column name
        platform_name: 'Whatsapp', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: 2, // Updated column name
        platform_name: 'E-mail', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: 3, // Updated column name
        platform_name: 'Website', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: 4, // Updated column name
        platform_name: 'Shopee', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: 5, // Updated column name
        platform_name: 'Toko Pedia', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        platform_id: 6, // Updated column name
        platform_name: 'Hotel', // Updated column name
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('platform', null, {}) // Updated table name
  }
}
