import * as express from 'express';
import mainRouter from '@routes';
import errorMiddleware from '@middlewares/error.middleware';
import {json, urlencoded} from 'body-parser';

const app = express();

app.use(json());

app.use(urlencoded({extended: true}));

app.use(mainRouter);

app.use(errorMiddleware);

export default app;
