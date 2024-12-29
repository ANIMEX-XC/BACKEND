'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_id: 1,
        user_name: 'superAdmin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a', // Hash for password "superAdmin"
        user_role: 'superAdmin',
        user_level: 'silver',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_id: 2,
        user_name: 'admin',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a', // Hash for password "admin"
        user_role: 'admin',
        user_level: 'silver',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_id: 3,
        user_name: 'Joko',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a', // Hash for password "user"
        user_role: 'user',
        user_level: 'silver',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_id: 4,
        user_name: 'Sarmidi',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a', // Hash for password "user"
        user_role: 'user',
        user_level: 'silver',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_id: 5,
        user_name: 'Alex',
        user_password: 'cf7c906bfbb48e72288fc016bac0e6ed58b0dc2a', // Hash for password "user"
        user_role: 'user',
        user_level: 'silver',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
