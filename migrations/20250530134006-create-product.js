'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameProduct: {
        type: Sequelize.STRING
      },
      descriptionProduct: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      orderId: {
        type: Sequelize.INTEGER,
        /*código extra para poder ver la relación product-order en Workbench - aún no se ve*/
        references: {
          model: 'Orders', // nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
        /*fin del código extra*/
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};