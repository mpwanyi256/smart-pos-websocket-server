const { Sequelize } = require('sequelize');
const { db } = require('./config');


/* https://sequelize.org/docs/v6/getting-started/ */
const connectToDB = async (cb) => {
    try {
        const sequelize = new Sequelize(db.name, db.user, db.password, {
            host: db.host,
            dialect: db.dialect,
        });
        await sequelize.authenticate();
        cb();
        console.log('Connected to DATABASE successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

module.exports = connectToDB;
