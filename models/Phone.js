"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Phone.belongsTo(models.ModelPh, {
        foreignKey: "modelId",
      });
    }
  }
  Phone.init(
    {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      productionYear: {
        field: "production_year",
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toDateString(),
        },
      },
      ramSize: {
        field: "ram_size",
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      processor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      screenSize: {
        field: "screen_size",
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      isNfc: {
        field: "is_nfc",
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Phone",
      tableName: "phones",
      underscored: true,
    }
  );
  return Phone;
};
