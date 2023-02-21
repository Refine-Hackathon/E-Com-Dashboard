import * as express from 'express';
import * as bodyParser from 'body-parser';
import productRouter from './Routes/ProductRouter';
import cartRouter from './Routes/CartRouter';
import authRouter from './Routes/AuthRouter';

import cors from 'cors';
import * as mongoose from 'mongoose';
import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express.default();
let flag = false;
let IntervalObj: any = null;
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(cors());
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/register' , authRouter);
app.use('/login' , authRouter);


export const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'shopping'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected');
});

app.listen(process.env.PORT_NO, () => {
  console.log(`Server running on ${process.env.PORT_NO} ...`);
});
