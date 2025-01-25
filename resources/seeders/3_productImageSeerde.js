'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
      {
        product_image_id: 1,
        product_image_product_id: 1, // Assuming the product_id of the product is 1
        product_image_url:
          'https://lh3.googleusercontent.com/proxy/HRMNV0vYu3jRnW1kp64hstf_fwzlPB4oMIwfsHHzvPKZ0M_EPOLBBu0PkGE1_KvTxNMigodTmboLvYWJaEnf3c6MRpYEJgAvb5gcgmbJhN7AtiLnG4ZHF-2_qXGZ-T1XSUEkS_F_YAZEUYrsKbn8KvUb9w5KWVjD2ika_DVHNiWRp0ZLdlctyInXrZT5poW8_LmYLJz5ubNCvw0',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 2,
        product_image_product_id: 1, // Assuming the product_id of the product is 1
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvSrC-NLhLN0XexE9w2iKcLsAOVZi6tVaUukMrsRlgPpZhzXDWG3sHFqCB7Vdril5DX8&usqp=CAU',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },

      {
        product_image_id: 3,
        product_image_product_id: 2, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT208z2A58m7K5bE5RWpHNeZO67T55QO4rRDQ&s',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 4,
        product_image_product_id: 3, // Assuming the product_id of the product is 2
        product_image_url:
          'https://img-z.okeinfo.net/library/images/2018/06/21/3ufji260tefvb4b16mvw_11872.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },

      {
        product_image_id: 5,
        product_image_product_id: 3, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT208z2A58m7K5bE5RWpHNeZO67T55QO4rRDQ&s',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 6,
        product_image_product_id: 6, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJw_KkFKS2fDak2jtFbxcQ4nWKCPkpMpgoTQ&s',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 7,
        product_image_product_id: 7, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeAv9_g36I6zWOD7D2EKLcdkbHZT3AiNApow&s',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 8,
        product_image_product_id: 5, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCSy0MunsN2H9omy7QZEd36BiiQEb8Cvb0Q&s',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_image_id: 9,
        product_image_product_id: 4, // Assuming the product_id of the product is 2
        product_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGqHTdVb9bCTHTkyeE_RS0cL0NEGp214sUw&s',
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
