import express from 'express';
// import ProjectRouter from "./project.router.js";
import UsersRouter from './users.router.js';
import DinersRouter from './diners.router.js';
import ProductsRouter from './products.router.js';

const router = express.Router();

// Project
// router.use("/project/", ProjectRouter);

//user
router.use('/users', UsersRouter);
router.use('/diners', DinersRouter);
router.use('/products', ProductsRouter);

export default router;
