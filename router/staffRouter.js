const exp = require("express");

const router = exp.Router();
const staffController = require("../controller/staffController");

router.get("/getStaff", staffController.getData);
router.get("/getStaff/:kode", staffController.getDataById);
router.post("/addStaff", staffController.postData);
router.post("/updateStaff/:kode", staffController.updateDataById);
router.delete("/delete/:kode", staffController.deleteDataById);

module.exports = router;