const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const axios = require("axios");
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const router = require('./routes/index');
global.__basedir = __dirname + "/..";

// custom middleware logger
app.use(logger);

// global.__basedir = __dirname + "/..";
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
// app.use("/public", express.static(path.join(__dirname, 'public')));

app.use(credentials);

app.use(cors());

app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

/* Route Start API */
app.use(verifyJWT); // ตรวจสอบข้อมูลก่อนนำไปใช้งาน

// วนข้อมูลสำหรับสร้างเส้น Endpoint API
app.use('/api', router);

/* Route End API */

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

const db = require("./models");

const port = process.env.PORT || 3001;

app.use(errorHandler);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
  