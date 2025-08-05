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
