const sequelize = require('../config/connection');
const { User, Pokemon } = require('../models');
const userData = require('./user.json');
const autoCompleteData = require('./autocomeplete.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Pokemon.bulkCreate(autoCompleteData, {
        returning: true,
    })

    process.exit(0)

};

seedDatabase();