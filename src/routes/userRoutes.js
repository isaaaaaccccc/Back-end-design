const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')


router.post('/',controller.checkEmailsExists, controller.register);
router.get('/',controller.readAllUsers)
router.get('/:id', controller.readUsersById);

router.put('/username/:user_id', controller.checkUsernamesExists,controller.checkEmailsExists, controller.updateUsersUsernamesByIds);
router.put('/email/:user_id', controller.checkEmailsExists, controller.updateUsersEmailByIds);
router.put('/bio/:user_id', controller.updateUsersBioByIds);
router.put('/picture/:user_id', controller.updateUsersPictureByIds);

router.delete('/:user_id', controller.deleteUsersByIds);

// router.put("/", controller.updateUsersPasswordByIds, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);










module.exports = router;