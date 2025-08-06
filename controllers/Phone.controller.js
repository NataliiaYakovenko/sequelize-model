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
      order: [["productionYear","ASC"]],
    });
    return res.status(200).send(resultArray);
  } catch (error) {
    next(error);
  }
};


