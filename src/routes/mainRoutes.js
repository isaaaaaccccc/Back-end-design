const express = require('express');
const router = express.Router();


const taskprogressRoutes = require('./taskprogressRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const shopRoutes = require('./shopRoutes');
const followRoutes = require('./followRoutes');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');



router.use("/task_progress",jwtMiddleware.verifyToken, taskprogressRoutes);
router.use("/tasks",jwtMiddleware.verifyToken, taskRoutes);
router.use("/users",jwtMiddleware.verifyToken, userRoutes);
router.use("/posts",jwtMiddleware.verifyToken, postRoutes);
router.use("/shops",jwtMiddleware.verifyToken, shopRoutes);
router.use("/follows",jwtMiddleware.verifyToken, followRoutes);




router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.put("/change_password", jwtMiddleware.verifyToken, userController.getPasswordwithUserID, bcryptMiddleware.comparePassword, bcryptMiddleware.hashPassword,userController.setNewPassword,jwtMiddleware.generateToken, jwtMiddleware.sendToken);









module.exports = router;