const { Router } = require("express");
const PhoneController = require("../controllers/Phone.controller");

const router = Router();

router.post("/phone", PhoneController.createPhone);

router.get("/phones", PhoneController.getAllPhones);

router.get("/phones/year", PhoneController.getAllPhonesYear);

router.get("/phones/more/:year", PhoneController.getAllPhonesMore2020);

router.put("/phone/:id", PhoneController.updatePhoneByPk);

router.put("/phones/year", PhoneController.updatePhones2021);

router.delete("/phone/:id", PhoneController.deletePhoneByPk);

router.delete("/phones/year", PhoneController.deletePhonesByYear);

module.exports = router;
