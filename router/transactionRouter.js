const exp = require("express");

const router = exp.Router();
const transactionController = require("../controller/transactionController");

router.post("/addTransaction", transactionController.postData);
router.get("/getTransaction", transactionController.getData);
router.get("/getTransaction/:id", transactionController.getDataById);
router.post('/:id/process', auth, transactionController.processTransaction);

module.exports = router;