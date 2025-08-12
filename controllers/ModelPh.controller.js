const { ModelPh } = require("../models");

module.exports.createModelPh = async (req, res, next) => {
  try {
    const { body } = req;
    const createdModelPh = await ModelPh.create(body);
    if (!createdModelPh) {
      return res.status(400).send("Something wrong");
    }
    return res.status(201).send(createdModelPh);
  } catch (error) {
    next(error);
  }
};
