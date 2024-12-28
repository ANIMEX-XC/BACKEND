'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
      {
        product_image_id: 1,
        product_image_product_id: 1, // Assuming the product_id of the product is 1
        product_image_url: 'https://example.com/product1-image1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 2,
        product_image_product_id: 1, // Assuming the product_id of the product is 1
        product_image_url: 'https://example.com/product1-image2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 3,
        product_image_product_id: 2, // Assuming the product_id of the product is 2
        product_image_url: 'https://example.com/product2-image1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {})
  }
}
