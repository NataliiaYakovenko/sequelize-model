"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      modelId: {
        field: "model_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "modelsPh",
            key: "id",
          },
        },
      },
      brand: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      productionYear: {
        field: "production_year",
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ramSize: {
        field: "ram_size",
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      processor: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      screenSize: {
        field: "screen_size",
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      isNfc: {
        field: "is_nfc",
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phones");
  },
};
