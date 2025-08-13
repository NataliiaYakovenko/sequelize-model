const { ModelPh, Phone } = require("../models");

module.exports.createModelPh = async (req, res, next) => {
  try {
    const { body } = req;
    const createdModelPh = await Phone.createModelPh(body);
    if (!createdModelPh) {
      return res.status(400).send("Something wrong");
    }
    return res.status(201).send(createdModelPh);
  } catch (error) {
    next(error);
  }
};
