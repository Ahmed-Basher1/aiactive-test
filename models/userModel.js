const bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail : true
        },
        allowNull: false,
        unique: true
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
      }
    });
    return User;
  };
