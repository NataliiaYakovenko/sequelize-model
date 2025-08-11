const { Router } = require("express");
const PhoneController = require("../controllers/Phone.controller");
const ModelPhController = require("../controllers/ModelPh.controller");

const router = Router();

router.post("/phone", PhoneController.createPhone);

router.get("/phones", PhoneController.getAllPhones);

router.get("/phones/all", PhoneController.getPhones);

router.get("/phone/:id", PhoneController.getPhoneByPk);

router.get("/phones/year", PhoneController.getAllPhonesYear);

router.get("/phones/more/:year", PhoneController.getAllPhonesMore2020);

router.put("/phone/:id", PhoneController.updatePhoneByPk);

router.put("/phones/year", PhoneController.updatePhones2021);

router.delete("/phone/:id", PhoneController.deletePhoneByPk);

router.delete("/phones/year", PhoneController.deletePhonesByYear);

router.post("/modelPh", ModelPhController.createModelPh);

module.exports = router;
