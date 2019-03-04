const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const seed = require('./models/seeDB');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payments');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const imageUploadRoutes = require('./routes/image-upload');

const app = express();
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Conntected to Mongo DB');
  })
  .catch(err => {
    console.log(err);
  });

// seed.seedDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/rentals', rentalRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api', imageUploadRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist/BookwithMe');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

app.listen(config.PORT, () => {
  console.log(`Server started at port ${config.PORT}`);
});
