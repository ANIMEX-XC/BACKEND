'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_ratings', [
      {
        product_rating_id: 1,
        product_rating_user_id: 1, // Assuming user_id 1 exists
        product_rating_product_id: 1, // Assuming product_id 1 exists
        product_rating_start: 5,
        product_rating_description: 'Great product, very satisfied!',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_rating_id: 2,
        product_rating_user_id: 2, // Assuming user_id 2 exists
        product_rating_product_id: 1, // Assuming product_id 1 exists
        product_rating_start: 4,
        product_rating_description: 'Good quality, but could improve packaging.',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_rating_id: 3,
        product_rating_user_id: 3, // Assuming user_id 3 exists
        product_rating_product_id: 2, // Assuming product_id 2 exists
        product_rating_start: 3,
        product_rating_description: 'It’s okay, but not what I expected.',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_ratings', null, {})
  }
}
