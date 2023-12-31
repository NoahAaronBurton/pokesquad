const { Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require ('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
}}

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
    },
    squad: { // todo: limit to six
      type: DataTypes.JSON, // Specify the data type for elements inside the array
      defaultValue: [], // Default value for an empty array
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)


module.exports = User;
