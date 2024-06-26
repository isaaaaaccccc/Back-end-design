const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController')


router.get("/",controller.readAllShops)
router.post("/purchase/:user_id",controller.createNewShops)
router.get("/:user_id",controller.readItemsbyIds)
router.get("/wallet/:user_id",controller.readWalletBalancebyIds)
router.post("/attack/:attacker_id",controller.attackByIds)
router.delete("/attack/:item_id",controller.deleteItembyIds)


module.exports = router;