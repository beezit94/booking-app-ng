module.exports = {
  PORT: process.env.PORT || 4000,

  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/book-with-me',

  JWT_SECRET: process.env.JWT_SECRET || 'secret_this_should_be_longer'
};

// 'mongodb://localhost/book-with-me'
