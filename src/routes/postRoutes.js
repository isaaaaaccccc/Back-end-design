const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController')


router.get("/",controller.readAllPosts)
router.post("/:user_id",controller.createNewPosts)
router.put("/:post_id",controller.updatePostsByIds)
router.delete("/:post_id",controller.deletePostsByIds)





module.exports = router;