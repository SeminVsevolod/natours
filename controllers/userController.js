const fs = require('fs');

/**
 * Загрузить список пользователей из файла
 */
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

/**
 * Получить список всех пользователей
 */
exports.getAllUsers = (req, res) => {
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
exports.getUser = (req, res) => {
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
exports.createUser = (req, res) => {
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
exports.updateUser = (req, res) => {
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
exports.deleteUser = (req, res) => {
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
