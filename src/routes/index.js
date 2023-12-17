import express from 'express';
// import ProjectRouter from "./project.router.js";
import UsersRouter from './users.router.js';
import ReviewsRouter from './reviews.router.js';
import DinersRouter from './diners.router.js';
import UserOrdersRouter from './userorders.router.js';

const router = express.Router();

// Project
// router.use("/project/", ProjectRouter);

//user
router.use('/users', UsersRouter);
router.use('/review', ReviewsRouter);
router.use('/diners', DinersRouter);
router.use('/userorders', UserOrdersRouter);

export default router;
