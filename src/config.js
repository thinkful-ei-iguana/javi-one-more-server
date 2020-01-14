module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://javier@localhost/one_more',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://javier@localhost/one_more_test',
    JWT_SECRET: process.env.JWT_SECRET || 'my-secret-code',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '20s'
  }