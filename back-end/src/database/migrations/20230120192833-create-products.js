'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      urlImage: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'url_image',
        defaultValue: '',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
