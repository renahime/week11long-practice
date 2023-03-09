'use strict';
const {
  Model
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
    airlineCode: { type:DataTypes.STRING}
    ,
    flightNumber: {type:DataTypes.INTEGER},
    inService: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    maxNumPassengers: {
      type: DataTypes.INTEGER
    },
    currentNumPassengers: {
      type:DataTypes.INTEGER,
      validate: {
        [Op.lt]: this.maxNumPassengers,
        checkService() {
          if(this.inService === false){
            currentNumPassengers = null;
          }
        }
      }
    },
    firstFlightDate: {type:DataTypes.DATE}
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};
