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
    useUnifiedTopology: true,
  })
  .then((connection) =>
    console.log(
      `DB connection successful -> ${connection.connections[0].host}:${connection.connections[0].port}`
    )
  )
  .catch((err) => console.log(`DB connection failed -> ${err.message}`));

/**
 * +---------------+
 * | START SERVER  |
 * +---------------+
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
