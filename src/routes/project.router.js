import express from "express";
import { PostsController } from "../controllers/posts.controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();
const postsController = new PostsController();

router.post("/", authMiddleware, postsController.createPost);

router.get("/", postsController.getPosts);

router.get("/:postId", postsController.getOne);

router.delete("/:postId", authMiddleware, postsController.deletePost);

router.put("/:postId", authMiddleware, postsController.putPost);

export default router;
