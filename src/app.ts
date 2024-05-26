import cors from 'cors';
import express, { Application, NextFunction, Request, Response, response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
  // const a = 10;
  res.send("Hello World!");
});

app.use(globalErrorHandler);

//not found 
app.use(notFound)

export default app;
