'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('company', [
      {
        company_id: 1,
        company_name: 'TechCorp',
        company_address: 'Jl. Haji Mena mena',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 2,
        company_name: 'GreenEnergy Ltd.',
        company_address: 'Jl. Boro Budur',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 3,
        company_name: 'HealthPlus',
        company_address: 'Jl. Gatot kaca',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('company', null, {})
  }
}
