import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './database/config';
import router from './routes/auth';
import routerMessages from './routes/message';
dotenv.config();

dbConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', [router,routerMessages]);

app.listen(4000, () => {
  console.log(`servidor corriendo en 4000`);
});
