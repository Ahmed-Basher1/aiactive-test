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
      otp: {
        type: Sequelize.STRING
      },
      role : {
        type: Sequelize.ENUM,
        values: ['admin', 'user'],
        defaultValue : "user"
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verified:  {
        type: Sequelize.DATE,
      }
    },{
      hooks: {
        beforeCreate: async(user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hashSync(user.password, salt);
        }
      },
        freezeTableName: true,
        instanceMethods: {
          validPassword: (password) => {
           return bcrypt.compareSync(password, this.password);
          }
         }
    });
    return Task;
  };
