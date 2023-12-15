import express from 'express';
import router from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';


import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddlewqare from './middlewares/error-handling.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

app.use('/frontend', express.static(__dirname + '/src/frontend'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LogMiddleware);
app.use(ErrorHandlingMiddlewqare);
app.use('/api', router);

app.use('/', express.static(path.join(__dirname, 'assets')));
app.use(express.static('assets'));

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸습니다.');
});
