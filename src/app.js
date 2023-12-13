import express from 'express';
import router from './routes/index.js';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddlewqare from './middlewares/error-handling.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LogMiddleware);
app.use(ErrorHandlingMiddlewqare);
app.use('/api', router);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸습니다.');
});
