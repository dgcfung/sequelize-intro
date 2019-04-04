const { Op } = require('sequelize');
const { Person } = require('./models');


const fetchOne = async () => {
  const person = await Person.findOne();
  console.log(person)
  // console.log(JSON.stringify(person))
}

fetchOne();











// const fetchAll = async () => {
//   const people = await Person.findAll();
//   console.log(JSON.stringify(people, null, 2));
//   process.exit();
// }

// fetchAll();











// const fetchSpecific = async (id) => {
//   const person = await Person.findByPk(id);
//   console.log(JSON.stringify(person, null, 2));
//   process.exit();
// }

// fetchSpecific(1);











// const fetchLowIds = async (max) => {
//   const people = await Person.findAll({
//     where: {
//       id: {
//         [Op.lt]: max
//       }
//     }
//   });

//   console.log(JSON.stringify(people, null, 2));
//   process.exit();
// }

// fetchLowIds(8);









// const fetchOnlyNames = async () => {
//   const names = await Person.findAll({
//     attributes: ['name']
//   });

//   console.log(JSON.stringify(names, null, 2));
//   process.exit();
// };

// fetchOnlyNames();










// const create = async (name, company, role, sector) => {
//   const person = await Person.create({
//     name,
//     company,
//     role,
//     sector
//   });

//   console.log(JSON.stringify(person, null, 2));
//   process.exit();
// };

// create('Joe Bogus', 'GA', 'Director', 'Instruction');











// const findPerson = async (personName) => {
//   const person = await Person.findOne({
//     where: {
//       name: personName
//     }
//   })
//   return person;
// }

// const updateName = async(person, name) => {
//   person.name = name;
//   await person.save();
//   console.log(JSON.stringify(person, null, 2));
//   process.exit();
// };

// const updateJoe = async () => {
//   const joe = await findPerson('Joe Schmoe')
//   await updateName(joe, 'Joe Shmoe');
// }

// updateJoe();









// const deletePerson = async (person) => {
//   await person.destroy();
//   console.log('Deleted:');
//   console.log(JSON.stringify(person, null, 2));
// };

// const deleteJoe = async () => {
//   const joe = await findPerson('Joe Shmoe')
//   await deletePerson(joe);
//   process.exit();
// }

// deleteJoe();

// const findJoeByPk = async () => {
//   const person = await Person.findByPk(31)
//   console.log(JSON.stringify(person, null, 2));
// }

// findJoeByPk()