const { Model, DataTypes} = require('sequelize');
const sequelize = require ('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: { 
          args: [7, 42],
          msg: "The password length should be between 7 and 42 characters."
       }
      },
    }
  },
  {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
  }
)


module.exports = User;
