const exp = require("express");

const router = exp.Router();
const staffController = require("../controller/staffController");

router.get("/getStaff", staffController.getData);
router.get("/getStaff/:id", staffController.getDataById);
router.post("/addStaff", staffController.postData);
router.post("/updateStaff/:id", staffController.updateDataById);
router.delete("/delete/:id", staffController.deleteDataById);

module.exports = router;