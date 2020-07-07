const mongoose = require('mongoose');

// Описываем схему для туров
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Создаем модель тура на основе описанной ранее схемы
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
