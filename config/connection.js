const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Use the MYSQL_URL environment variable for database connection if it exists
if (process.env.MYSQL_URL) {
  sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
