const express = require('express');
const router = express.Router();
const apiContoller = require("../controllers/api");
const { authenticate } = require('../middleware');


// router.get("/userByUsername",authenticate,apiContoller.userByUsername)

router.get("/thought",apiContoller.getPosts)
router.get("/relatedPosts",apiContoller.getRelatedPosts);
router.get("/singlePost",apiContoller.getSinglePost);

router.post("/thought",authenticate,apiContoller.createPost)
router.put("/thought",authenticate,apiContoller.updatePost)
router.delete("/thought",authenticate,apiContoller.deletePost)

router.get("/project",apiContoller.getProjects)
router.get("/singleProject",apiContoller.getSingleProject)
router.post("/project",authenticate,apiContoller.createProject)
router.put("/project",authenticate,apiContoller.updateProject)
router.delete("/project",authenticate,apiContoller.deleteProject)


module.exports = router