// seeds/index.js
const sequelize = require('../config/connection');
const { User, Pokemon} = require('../models');
const userData = require('./user.json');
const pokemonData = require('./pokemon.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User and Pokemon tables
 await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

 await Pokemon.bulkCreate(pokemonData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
