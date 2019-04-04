# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  WEB DEVELOPMENT IMMERSIVE

# Sequelize

### Learning Objectives

 - Describe what an ORM is and why we would use one
 - Model a database using an ORM
 - Create a Sequelize model of a database table 
 - Insert data with model methods
 - Target a specific record in a database using Sequelize model methods and operators

### Prior to this Lesson
_Students should already be able to..._

- Create, read, update and delete from a database using SQL. 
- Use SQL syntax to define datatypes, perform joins and filtering.

## What's going on here?
We will store our information in databases, and we've seen that we can query databases with SQL commands. But how can we access a database from within a JavaScript application?

An **Object Relational Mapping**, or **ORM**, bridges this gap for us. An ORM library like Sequelize offers an easy way to communicate with a database with familiar JavaScript syntax.

 [From the venerable wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping#Comparison_with_traditional_data_access_techniques)
 
> Compared to traditional techniques of exchange between an object-oriented language and a relational database, ORM often reduces the amount of code that needs to be written.[2]

> Disadvantages of ORM tools generally stem from the high level of abstraction obscuring what is actually happening in the implementation code. Also, heavy reliance on ORM software has been cited as a major factor in producing poorly designed databases.

The core motivation for developing and using an ORM framework is the need to overcome the [impedance mismatch problem](https://en.wikipedia.org/wiki/Object-relational_impedance_mismatch)

> The object-relational impedance mismatch is a set of conceptual and technical difficulties that are often encountered when a relational database management system (RDBMS) is being served by an application program (or multiple application programs) written in an object-oriented programming language or style, particularly because objects or class definitions must be mapped to database tables defined by a relational schema.

In short, we want to be able to interact with a SQL database using an Object-Oriented programming paradigm, and an ORM framework provides a set of absrtactions and methods that allow developers to write code in this fashion.  

An additional touted benefit is that ORM frameworks isolate developers from the inner quirks of particular database implementations, but in practice this is often a secondary concern at most.  Generally, the ability to compose snippets of code and queries into more general operations and the seamless integration of information from the database into the native programming language structures are what justify the "magic" inherent in an ORM framework.

## Basic Concepts and Queries

One of the fundamental design choices of modern ORM's is to represent an individual row in a database as a single instantiated object (or structure) in the application programming language.  A table is represented as a class object or as a class.  Therefore, operations that are performed on a table, e.g., retrieving or inserting a particular row, are _class methods_, and operations that are performed on a single row, e.g., updating a column, are _instance methods_ on a particular object.

Assuming we have defined a `Person` model, we can retrieve all of the rows in the `people` table with the `findAll()` method:

```javascript
Person.findAll()
```

Note that database operations are asynchronous and thus must be handled appropriately:

```js
const fetchAll = async () => {
  const people = await Person.findAll();
  return people;
}
```

We can also find a particular record by `id` using the `findByPk(id)` method:

```javascript
const fetchSpecific = async (id) => {
  const person = await Person.findByPk(id);
  return person;
}
```

But what sorts of values do these methods return?

```js
try {
    const person = await Person.findByPk(18);
    console.log(person.dataValues);

  } catch(e) {
    console.log(e);
  }
```

will log out the following:

```js
{ id: 18,
  company: 'Schoen, Murazik and Stiedemann',
  name: 'Laney Conn Sr.',
  role: 'International Configuration Technician',
  sector: 'Usability',
  createdAt: 2018-11-26T14:04:13.588Z,
  updatedAt: 2018-11-26T14:04:13.588Z }
```

So `dataValues` gives an object key/value model of this particular database record.

There are a few other nifty features of the model:

```js
try {
    const person = await Person.findByPk(18);
    console.log(person.name);

  } catch(e) {
    console.log(e);
  }
```

will simply log out the person's `name` field.  So each column is represented as a property on the `person` instance.

But since the column values are represented as properties what happens if we change one?

```js
person.name = 'jay-z';
await person.save();
```

Will re-assign the `name` property of the `person` and the `save` method will update the record in the db with the new value. *Yay*

Using methods like these, we can manipulate and fetch data from the database using semantics more natural to us as application developers.

*NOTE:*
This doesn't mean you're off the hook with learning SQL.  It is vital to any web developer to be able to write basic SQL queries and to have some undersrtanding of the generated SQL emitted from the ORM framework they are using.

### Creating and Destroying Data

Since we can fetch data from the database and work with it in the form of a javascript object, it stands to reason that we should be able to insert records by passing javascript objects to some ORM method.  And in fact we can!

```javascript
await Person.create({
	name: 'Bobby',
	company: 'Coca-Cola',
	role: 'CEO',
	sector: 'admin'
});
```

Will create a new row in the `people` table with the corresponding attributes.


Similarly, `destroy` will delete a record:

```
await person.destroy();
```

### More Nuanced Queries

### Where clause

`Where` clauses can be written in the form of additional key/val options passed to query methods.

```js
const records = await Record.findAll({
  where: {
    year: '2017',
  }
});
```

### AND and OR clauses

Special SQL operators are exposed through Sequelize using special keys on the `Op` object.  Note the `[Op.or]` bracket syntax for passing special op keys to the options object.

```js
const { Op } = require('sequelize');

const records = await Record.findAll({
  where: {
    [Op.or]: [
      { year: '2017' },
      { year: '2006' },
    ],
  },
});
```

```js
const beyonce = await Artist.findOne({
  where: {
    name: 'Beyoncé',
  },
});

const { Op } = require('sequelize');

const records = await Record.findAll({
  where: {
    [Op.and]: [
      { year: '2016' },
      { artistId: beyonce.id },
    ],
  },
});
```

### Particular attributes

```js
const names = await Person.findAll({
    attributes: ['name']
  });
```

There are many more operators such as `[Op.like]` and `[Op.in]`. Read [the Sequelize Operators documentation for examples](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators).

### Ordering 

```js
const records = await Record.findAll({
  order: [
    ['title', 'ASC'],
    ['year', 'ASC'],
  ]
});
```

### Paginating / Limiting Results

```js
const records = await Record.findAll({
  limit: 10,
  offset: 100
});
```

## Delete an instance

```js
const baldwin = await Author.findOne({
  where: {
    name: 'James Baldwin' 
  }
});

baldwin.destroy();
```

## Update an instance

```js
baldwin.name = 'James Arthur Baldwin';
await baldwin.save();
```

### Codealong

- Clone down this repo
- run `npm install`
- run `createdb people_db`
- run `npm run resetDb` and `npm run seed`
- open `main.js` in your editor and add relevant code either as functions that are called in the `main` function or directly in `main`

**Problems:**

- write a function that fetches all `people` from the db and returns the array
- fetch all the `people` from the db, but only return their `name` and `company` using the `forEach()` array method
- fetch only people who have id's greater than 10
- Create two new people and make sure they are saved to the db.  How might you verify this both in psql and using sequelize?
- Fetch one of the people you just created and update/save their role
- Fetch another person you did not create adn update their name to your own
- Create yet another person, verify that they are in the db, then fetch and destroy that person

**Bonus:**

Fetch everyone from the db, update _all_ of their `company` columns to `General Assembly` and make sure they are saved to the db. There is a Sequelize method called `bulkCreate`...
