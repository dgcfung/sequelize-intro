const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'people_db',
  dialect: 'postgres',
  operatorsAliases: false
});

const Person = sequelize.define('person', {
  company: Sequelize.STRING,
  name: Sequelize.STRING,
  role: Sequelize.TEXT,
  sector: Sequelize.STRING
});

module.exports = {
  sequelize,
  Person
};
