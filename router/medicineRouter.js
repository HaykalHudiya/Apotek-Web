const exp = require("express");

const router = exp.Router();
const medicineController = require("../controller/medicineController");

router.post("/addObat", medicineController.postData);
router.get("/getObat", medicineController.getData);
router.get("/getObat/:id", medicineController.getDataById);
router.post("/updateData/:id", medicineController.updateDataById);

module.exports = router;