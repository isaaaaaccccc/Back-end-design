const express = require('express');
const router = express.Router();
const controller = require('../controllers/followController')


router.post('/:follower',controller.checkPairsExists, controller.createNewFollows);
router.get("/",controller.readAllFollows);
router.get('/:id', controller.readFollowsByIds);
router.delete('/:follower', controller.deleteFollowsByIds);



module.exports = router;