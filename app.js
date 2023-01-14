
// ? definations
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

// ? routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// ? middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.json());

// ?  Use Swagger
// ? Setup Swagger Docs
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require("swagger-jsdoc");
const options = require('./helpers/swaggerDocs')
const swaggerDocs = swaggerJsDoc(options);
// ? rateLimiter to avoid Dos attack
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
    })
  );
  // ? using some packeges for security
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  app.use(morgan('tiny'));
  
  // ? main routes 
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  // ? Error Handler
  app.use(errorHandlerMiddleware);
  // ? not Found 
 app.use(notFoundMiddleware);
const port = process.env.PORT || 5000;
// ? start server
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();



