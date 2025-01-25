'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_kyc', [
      {
        user_kyc_id: 1,
        user_kyc_user_id: 1,
        user_kyc_ktp_image: 'path_to_ktp_image_1.jpg',
        user_kyc_selfie_image: 'path_to_selfie_image_1.jpg',
        user_kyc_real_name: 'John Doe',
        user_kyc_address: '123 Main St, City, Country',
        user_kyc_date_of_birth: '1985-06-15',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_kyc_id: 2,
        user_kyc_user_id: 2,
        user_kyc_ktp_image: 'path_to_ktp_image_2.jpg',
        user_kyc_selfie_image: 'path_to_selfie_image_2.jpg',
        user_kyc_real_name: 'Jane Smith',
        user_kyc_address: '456 Oak St, City, Country',
        user_kyc_date_of_birth: '1990-11-20',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        user_kyc_id: 3,
        user_kyc_user_id: 3,
        user_kyc_ktp_image: 'path_to_ktp_image_3.jpg',
        user_kyc_selfie_image: 'path_to_selfie_image_3.jpg',
        user_kyc_real_name: 'Alice Johnson',
        user_kyc_address: '789 Pine St, City, Country',
        user_kyc_date_of_birth: '1988-03-25',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_kyc', null, {})
  }
}
