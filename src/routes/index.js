import express from 'express';
// import ProjectRouter from "./project.router.js";
import UsersRouter from './users.router.js';
import ReviewsRouter from './reviews.router.js';

const router = express.Router();

// Project
// router.use("/project/", ProjectRouter);

//user
router.use('/users', UsersRouter);
router.use('/diners/:dinerId/reviews', ReviewsRouter);

export default router;
