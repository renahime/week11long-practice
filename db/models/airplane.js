'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airplane.init({
    airlineCode: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 2],
        isUppercase: true
      }
    },
    flightNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 4],
        isNumeric: true
      }
    },
    inService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    maxNumPassengers: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min:2,
        max:853
      }
    },
    currentNumPassengers: {
      type: DataTypes.INTEGER,
      validate: {
        [Op.lt]: this.maxNumPassengers,
        min: 0,
        max:853,
        checkService(value) {
          if (this.inService === false) {
            if (value !== null) {
              throw new Error('must be null')
            }
          }
        }
      }
    },
    firstFlightDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isAfter: '2019-12-31',
        isBefore: '2022-01-01'
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane',
    indexes:[ {
      unique:true,
      fields: [ 'airlineCode', 'flightNumber']
    }]
  });
  return Airplane;
};
