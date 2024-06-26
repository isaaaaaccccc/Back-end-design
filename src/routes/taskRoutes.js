const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController')


router.post('/', controller.createNewTasks);
router.get('/', controller.readAllTasks);
router.get('/:id', controller.readTasksByIds);
router.put('/:id', controller.updateTasksByIds);
router.delete('/:id', controller.deleteTasksByIds);














module.exports = router;