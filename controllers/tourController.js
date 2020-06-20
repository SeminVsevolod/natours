const fs = require('fs');

/**
 * Загрузить список туров из файла
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/**
 * Проверить наличие id в req.params
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} val 
 */
exports.checkID = (req, res, next, val) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  // Если тур не найден, ответить 404 с ошибкой
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

/**
 * Проверить body на наличие name или price
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.checkBody = (req, res, next) => {
  // Если тур не найден, ответить 404 с ошибкой
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Name or price is missed'
    });
  }
  next();
};

/**
 * Получить список всех туров
 */
exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

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
exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
