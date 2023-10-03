const User = require('./User');
const Pokemon = require('./Pokemon');

//todo: define relationships to access 

User.hasMany(Pokemon, {
    foreignKey: 'user_id',
  });
  
// User.belongsToMany(Pokemon, {
//     foreignKey: 'user_id',
//   });

Pokemon.belongsTo(User, {
    foreignKey: 'user_id',
  });
module.exports = {User, Pokemon};