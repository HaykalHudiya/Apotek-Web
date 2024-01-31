const exp = require("express");

const router = exp.Router();
const stockController = require("../controller/stockController");

router.get("/getStock", stockController.getData);
router.get("/getStock/:sort", stockController.getDataASC);
router.post("/addStock/:kode/:count", stockController.postData);

module.exports = router;