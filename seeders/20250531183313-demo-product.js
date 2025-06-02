'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Products', [
      {
        nameProduct: 'The Legend of Zelda',
        descriptionProduct: 'Juego de aventuras y exploración en un mundo abierto',
        price: 59.99,
        orderId: 1, // Asegúrate de que esta Order exista
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameProduct: 'Super Mario Odyssey',
        descriptionProduct: 'Plataformas en 3D con exploración y puzzles',
        price: 49.99,
        orderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameProduct: 'Hades',
        descriptionProduct: 'Roguelike de acción con historia dinámica',
        price: 24.99,
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameProduct: 'Stardew Valley',
        descriptionProduct: 'Simulador de granja con exploración y relaciones',
        price: 14.99,
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nameProduct: 'Celeste',
        descriptionProduct: 'Plataformas desafiante con gran narrativa',
        price: 19.99,
        orderId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};