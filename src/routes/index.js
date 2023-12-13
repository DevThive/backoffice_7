import express from "express";
// import ProjectRouter from "./project.router.js";
import UsersRouter from "./users.router.js";

const router = express.Router();

// Project
// router.use("/project/", ProjectRouter);

//user
router.use("/users", UsersRouter);

export default router;
