const { Op } = require('sequelize');
const { Person } = require('./models');


const fetchOne = async () => {
  const person = await Person.findOne();
  return person;
}

const fetchAll = async () => {
  const people = await Person.findAll();
  return people;
}

const fetchSpecific = async (id) => {
  const person = await Person.findById(id);

  return person;
}

const fetchLowIds = async (max) => {
  const people = await Person.findAll({
    where: {
      id: {
        [Op.lt]: max
      }
    }
  });

  return people;
}

const fetchOnlyNames = async () => {
  const names = await Person.findAll({
    attributes: ['name']
  });

  return names;
};

const create = async (name, company, role, sector) => {
  const person = await Person.create({
    name,
    company,
    role,
    sector
  });

  return person;
};

const updateName = async(person, name) => {
  person.name = name;
  await person.save();
  return person;
};

const deletePerson = async (person) => {
  return await person.destroy();
};

