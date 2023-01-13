const bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role : {
        type: Sequelize.ENUM,
        values: ['admin', 'user'],
        defaultValue : "user"
      }
    },{
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
    return Task;
  };
