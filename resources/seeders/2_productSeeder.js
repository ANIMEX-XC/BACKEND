'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        product_id: 1,
        product_user_id: 3,
        product_name: 'Kura Kura rawa',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 1200000,
        product_weight: 1.5,
        product_colors: 'Red, Blue',
        product_sizes: 'M, L, XL',
        product_transaction_type: 'Sell',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 2,
        product_user_id: 3,
        product_name: 'Bulus',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 320000,
        product_weight: 2.0,
        product_colors: 'Gold, Silver',
        product_sizes: 'S, M, L',
        product_transaction_type: 'Auction',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 3,
        product_user_id: 4,
        product_name: 'Kura Kura Gunung',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 200000,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 4,
        product_user_id: 5,
        product_name: 'Kura Kura Sawah',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 2300000,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 5,
        product_user_id: 5,
        product_name: 'Kura Kura Desert',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 1, // Ensure this corresponds to an existing category ID
        product_price: 2300000,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 6,
        product_user_id: 4,
        product_name: 'Parrot',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 2, // Ensure this corresponds to an existing category ID
        product_price: 2400000,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        product_id: 7,
        product_user_id: 4,
        product_name: 'Ikan Cupang',
        product_description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        product_category_id: 3, // Ensure this corresponds to an existing category ID
        product_price: 2500000,
        product_weight: 1.0,
        product_colors: 'Black, White',
        product_sizes: 'S, M',
        product_transaction_type: 'Barter',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}
