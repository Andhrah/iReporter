// requiring express
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/red-flag';
import authRoutes from './routes/auth';
import interventionRouter from './routes/intervention';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', authRoutes);
app.use('/api/v1', router);
app.use('/api/v1', interventionRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('App running on port 3000');
});

export default app;
