const exp = require("express");

const router = exp.Router();
const medicineController = require("../controller/medicineController");

router.post("/addObat", medicineController.postData);
router.get("/getObat", medicineController.getData);
router.get("/getObat/:kode", medicineController.getDataById);
// router.get("/getObatN/:nama/:qty", medicineController.getDataByNama);
router.post("/updateData/:kode", medicineController.updateDataById);

module.exports = router;