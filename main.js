const { Person } = require('./models');
const { Op } = require('sequelize');

const main = async () => {
  try {
    const person = await Person.findByPk(18);
    console.log(person.name);

  } catch(e) {
    console.log(e);
  }
}
const run = async () => {
  await main();
  process.exit();
}

run();
