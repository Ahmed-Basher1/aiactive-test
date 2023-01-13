
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet =  require('helmet');
const rateLimiter = require('express-rate-limit');
const cors =  require('cors');
const xss = require('xss-clean');
const db = require("./db/config");

db.sequelize.sync();
 const authRouter = require('./routes/auth');
//  const userRouter = require('./routes/userRoutes');

// middleware
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.json());

app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
    })
  );
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  app.use(morgan('tiny'));
  
  app.use('/api/v1/auth', authRouter);
//   app.use('/api/v1/user', userRouter);
//   app.use(errorHandlerMiddleware);
//  app.use(notFoundMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectMongo(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();



