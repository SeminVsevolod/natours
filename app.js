const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

/**
 * +-----------------+
 * | 1) MIDDLEWARES  |
 * +-----------------+
 */

app.use(morgan('dev'));

/**
 * Дает доступ к req.body в виде JSON
 */
app.use(express.json());

/**
 * Тестовый промежуточный обработчик
 */
app.use((req, res, next) => {
  console.log('Hello from the middleware 🤝');
  next();
});

/**
 * Записывает время запроса в requestTime
 */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Загрузить список туров из файла
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * Загрузить список пользователей из файла
 */
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

/**
 * +--------------------+
 * | 2) ROUTE HANDLERS  |
 * +--------------------+
 */

/**
 * Получить список всех туров
 */
const getAllTours = (req, res) => {
  console.log('getAllTours requestTime', req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

/**
 * Получить тур по id
 */
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // Если тур не найден, ответить 404 с ошибкой
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

/**
 * Добавить новый тур
 */
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  /**
   * Перезаписывам JSON файл с турами (который используем в качестве фиктивной БД)
   */
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      /**
       * Статус 201 озн. "ресурс создан"
       */
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

/**
 * Обновить существующий тур
 */
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // Если тур не найден, ответить 404 с ошибкой
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

/**
 * Удалить существующий тур
 */
const deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // Если тур не найден, ответить 404 с ошибкой
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

/**
 * Получить список всех пользователей
 */
const getAllUsers = (req, res) => {
  console.log('getAllUsers requestTime', req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
};

/**
 * Получить пользователя по id
 */
const getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => {
    return el._id === id;
  });

  // Если тур не найден, ответить 404 с ошибкой
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

/**
 * Добавить нового пользователя
 */
const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ _id: newId }, req.body);

  users.push(newUser);

  /**
   * Перезаписывам JSON файл с турами (который используем в качестве фиктивной БД)
   */
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      /**
       * Статус 201 озн. "ресурс создан"
       */
      res.status(201).json({
        status: 'success',
        data: {
          users: newUser,
        },
      });
    }
  );
};

/**
 * Обновить существующего пользователя
 */
const updateUser = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  // Если тур не найден, ответить 404 с ошибкой
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: '<Updated user here>',
    },
  });
};

/**
 * Удалить существующего пользователя
 */
const deleteUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const user = users.find((el) => el._id === id);

  // Если тур не найден, ответить 404 с ошибкой
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

/**
 * +------------+
 * | 3) ROUTES  |
 * +------------+
 */
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

/**
 * +------------------+
 * | 4) START SERVER  |
 * +------------------+
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
