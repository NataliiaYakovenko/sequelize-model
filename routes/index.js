const { Router } = require("express");
const PhoneController = require("../controllers/Phone.controller");


const router = Router();

router.post("/phone", PhoneController.createPhone);

module.exports = router;
