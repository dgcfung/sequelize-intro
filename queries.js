const { Op } = require('sequelize');
const { Person } = require('./models');


const fetchOne = async () => {
  const person = await Person.findOne();
  console.log(person)
  console.log(JSON.stringify(person, null, 2))
}

fetchOne();

// Finish writing your queries here.
