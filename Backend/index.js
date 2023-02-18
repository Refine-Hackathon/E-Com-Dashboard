const {userRouter} = require("./routes/user.routes.js");
const {productRouter} = require("./routes/product.routes.js");

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const port = 9000;
const fs = require('fs');


app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(cors());
app.use("/auth", userRouter);
app.use("/products", productRouter);


app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

dotenv.config();
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'shopping',
    port: 3306,
  });
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Database connected ' );
  });

global.db = db;

app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

