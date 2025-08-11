const { ModelPh } = require("../models");

module.exports.createModelPh = async (req, res, next) => {
  try {
    const { body } = req;
    const createdModelPh = await ModelPh.create(body);
    return res.status(201).send(createdModelPh);
  } catch (error) {
    next(error);
  }
};
