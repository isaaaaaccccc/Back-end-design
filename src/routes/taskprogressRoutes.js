const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskprogressController')


router.post('/', controller.checkUserIdsExists,controller.checkTaskIdsExists,controller.createNewTaskProgresses);
router.get('/', controller.readAllTaskProgresses);
router.get('/:id', controller.readTaskProgressesByIds);
router.get('/user/:user_id', controller.readTaskProgressesByUserIds);
router.put('/:id', controller.updateTaskprogressesByIds);
router.delete('/:id', controller.deleteTaskprogressesByIds);















module.exports = router;