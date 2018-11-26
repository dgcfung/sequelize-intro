const { Person } = require('./models');
const { data } = require('./data');

const genPeople = async () => {
  try {
    const people = await Person.bulkCreate(data);

    console.log(`${people.length} people created`);
  } catch(e) {
    console.log('oopsie: ', e);
  }
}

const main = async () => {
  await genPeople();
  process.exit();
}

main();
