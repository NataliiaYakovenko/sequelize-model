const { Op } = require("sequelize");
const { Phone, ModelPh } = require("../models/index");

module.exports.createPhone = async (req, res, next) => {
  try {
    const { body } = req;
    const createdPhone = await Phone.create(body);
    if (!createdPhone) {
      return res.status(400).send("Something wrong");
    }
    return res.status(201).send(createdPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.createPhoneByModel = async (req, res, next) => {
  try {
    const { modelId } = req.params;
    const { body } = req;

    const modelPh = await ModelPh.findByPk(modelId);
    if (!modelPh) {
      return res.status(404).send("Model not found");
    }
    const createdPhone = await modelPh.createPhone(body);

    return res.status(201).send(createdPhone);
  } catch (error) {
    next(error);
  }
};

//varios 2
// module.exports.createPhoneByModel = async (req, res, next) => {
//   try {
//     const { body } = req;
//     const createdPhone = await Phone.create(body);
//     if (!createdPhone) {
//       return res.status(400).send("Something wrong");
//     }
//     return res.status(201).send(createdPhone);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports.getPhones = async (req, res, next) => {
  try {
    const resultArray = await Phone.findAll();
    if (!resultArray) {
      return res.status(404).send("Not found");
    }
    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneByPk = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const resultArray = await Phone.findByPk(id);
    if (!resultArray) {
      return res.status(404).send("Not found");
    }
    return res.status(200).send(resultArray);
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
    if (!resultArray) {
      return res.status(404).send("Not found");
    }
    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};

module.exports.getPhonesByModel = async (req, res, next) => {
  try {
    const { title } = req.params;

    const model = await ModelPh.findOne({
      where: { title },
    });
    if (!model) {
      return res.status(404).send("Model not found");
    }
    const phones = await model.getPhones();
    if (!phones) {
      return res.status(404).send("No phones found for this model");
    }
    return res.status(200).send(phones);
  } catch (error) {
    next(error);
  }
};

//version 2
// module.exports.getPhonesByModel = async (req, res, next) => {
//   try {
//     const { modelId } = req.params;
//     const resultArray = await Phone.findAll({
//       where: {
//         modelId: modelId,
//       },
//     });
//     if (!resultArray) {
//       return res.status(404).send("Not found");
//     }
//     return res.status(200).send(resultArray);
//   } catch (error) {
//     next(error);
//   }
// };

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
    if (!resultArray) {
      return res.status(404).send("Not found");
    }
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
    if (!resultArray) {
      return res.status(404).send("Not found");
    }
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
    if (!updatedPhonesArray) {
      return res.status(400).send("Something wrong");
    }
    return res.status(200).send(updatedPhonesArray);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePhones2021 = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const year = 2021;
    const startYear = `${year}-01-01`;
    const endYear = `${year}-12-31`;

    const updatedPhonesArray = await Phone.update(body, {
      where: {
        productionYear: {
          [Op.between]: [startYear, endYear],
        },
      },
    });
    if (!updatedPhonesArray) {
      return res.status(400).send("Something wrong");
    }
    return res.status(200).send(updatedPhonesArray);
  } catch (error) {
    next(error);
  }
};

module.exports.deletePhoneByPk = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const rowsCount = await Phone.destroy({ where: { id: id } });

    if (rowsCount > 0) {
      return res.status(200).send("Successful delete");
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deletePhonesByYear = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const year = 2010;
    const startYear = `${year}-01-01`;
    const endYear = `${year}-12-31`;

    const rowsCount = await Phone.destroy({
      where: {
        productionYear: {
          [Op.between]: [startYear, endYear],
        },
      },
    });

    if (rowsCount > 0) {
      return res.status(200).send("Successful delete");
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
