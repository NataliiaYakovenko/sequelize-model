"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Model.hasMany(models.Phone, {
        foreignKey: "modelId",
      });
    }
  }
  Model.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      releaseYear: {
        field: "release_year",
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toDateString(),
        },
      },
    },
    {
      sequelize,
      modelName: "Model",
      tableName: "models",
      underscored: true,
    }
  );
  return Model;
};
