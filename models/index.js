const User = require('./User');
const Pokemon = require('./Pokemon');

//todo: define relationships between tables
User.hasMany(Pokemon, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Pokemon.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = {User, Pokemon};