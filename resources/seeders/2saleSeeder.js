'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sales', [
      {
        sale_id: 1,
        user_id: 1,
        sale_code: 'RG123',
        sale_total_amount: 150.75,
        sale_payment_method: 'cash',
        sale_deliver_company_name: 'PT. Indah Pada Waktunya',
        sale_deliver_company_address: 'Jl.hadi nangka',
        sale_platform_name: 'Shopee',
        created_at: new Date(),
        sale_po: '1233'
      },
      {
        sale_id: 2,
        user_id: 2,
        sale_code: 'YG124',
        sale_total_amount: 299.99,
        sale_platform_name: 'Toko Pedia',
        sale_payment_method: 'credit_card',
        sale_deliver_company_name: 'PT. Indah Pada Waktunya',
        sale_deliver_company_address: 'Jl.hadi nangka',
        created_at: new Date(),
        sale_po: '1233'
      },
      {
        sale_id: 3,
        user_id: 1,
        sale_code: 'TT123',
        sale_total_amount: 89.5,
        sale_platform_name: 'Whatsapp',
        sale_payment_method: 'cash',
        sale_deliver_company_name: 'PT. Indah Pada Waktunya',
        sale_deliver_company_address: 'Jl.hadi nangka',
        sale_po: '1233',
        created_at: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales', null, {})
  }
}
