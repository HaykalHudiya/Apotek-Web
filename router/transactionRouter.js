const exp = require("express");

const router = exp.Router();
const transactionController = require("../controller/transactionController");

router.post("/addTransaction/:staffs", transactionController.postData);
router.get("/getTransaction", transactionController.getData);
router.get("/getTransaction/:kode", transactionController.getDataById);

module.exports = router;