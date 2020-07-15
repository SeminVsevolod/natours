const Tour = require('../models/tourModel');

/**
 * Получить список всех туров
 */
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
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
 * Получить тур по id
 */
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
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
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err.message,
    });
  }
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
