const Tour = require('../models/tourModel');

/**
 * Получить список всех туров
 */
exports.getAllTours = (req, res) => {
  console.log('getAllTours requestTime', req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

/**
 * Получить тур по id
 */
exports.getTour = (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

/**
 * Добавить новый тур
 */
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    /**
     * Статус 201 озн. "ресурс создан"
     */
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

/**
 * Обновить существующий тур
 */
exports.updateTour = (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour here>',
  //   },
  // });
};

/**
 * Удалить существующий тур
 */
exports.deleteTour = (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
};
