const { Op } = require("sequelize");
const { Phone } = require("../models/index");

module.exports.createPhone = async (req, res, next) => {
  try {
    const { body } = req;
    const createdPhone = await Phone.create(body);
    return res.status(201).send(createdPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPhones = async (req, res, next) => {
  try {
    const { page = 1, results = 10 } = req.query;
    const limit = Number(results);
    const offset = (page - 1) * limit;

    const resultArray = await Phone.findAll({
      limit,
      offset,
      order: [["productionYear", "ASC"]],
    });
    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPhonesYear = async (req, res, next) => {
  try {
    const { year } = req.query;
    const startYear = `${year}-01-01`;
    const endYear = `${year}-12-31`;

    const resultArray = await Phone.findAll({
      where: {
        productionYear: {
          [Op.between]: [startYear, endYear],
        },
      },
    });

    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllPhonesMore2020 = async (req, res, next) => {
  try {
    const year = 2020;

    const resultArray = await Phone.findAll({
      where: {
        productionYear: {
          [Op.gt]: `${year}-12-31`,
        },
      },
    });

    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePhoneByPk = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedPhonesArray = await Phone.update(body, {
      where: { id: id },
      returning: true,
    });

    return res.status(200).send(updatedPhonesArray);
  } catch (error) {
    next(error);
  }
};


module.exports.updatePhones2021 = async (req, res, next) => {
  try {
    const {params: { id },body} = req;
    const year = 2020;
    const updatedPhonesArray = await Phone.update(body, {
      where: {
        productionYear: {
          [Op.gt]: `${year}-12-31`,
        },
      },
    });

    return res.status(200).send(updatedPhonesArray);
  } catch (error) {
    next(error);
  }
};