const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

/**
 * +--------------------+
 * | INIT CONFIGURATION |
 * +--------------------+
 */
dotenv.config({ path: './config.env' });

/**
 * +---------------------+
 * | DATABASE CONNECTION |
 * +---------------------+
 */
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) =>
    console.log(
      `DB connection successful -> ${connection.connections[0].host}:${connection.connections[0].port}`
    )
  )
  .catch((err) => console.log(`DB connection failed -> ${err.message}`));

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
const Tour = mongoose.model('Tour', tourSchema);

/**
 * +---------------+
 * | START SERVER  |
 * +---------------+
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
