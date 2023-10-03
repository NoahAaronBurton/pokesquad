const Sequelize = require('sequelize');

// Use the MYSQL_URL environment variable for database connection
const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
});

module.exports = sequelize;
