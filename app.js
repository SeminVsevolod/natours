const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/**
 * +--------------+
 * | MIDDLEWARES  |
 * +--------------+
 */
if (process.env.NODE_ENV === 'development') {
  /**
   * Выводит информацию о запросах в консоль
   */
  app.use(morgan('dev'));
}

/**
 * Дает доступ к req.body в виде JSON
 */
app.use(express.json());

/**
 * Отдавать статические файлы из папки public
 */
app.use(express.static(`${__dirname}/public`));

/**
 * Записывает время запроса в requestTime
 */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * +---------+
 * | ROUTES  |
 * +---------+
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
