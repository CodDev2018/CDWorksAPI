'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Skills', [{
      name: 'JavaScript'
    },
    {
      name: 'HTML'
    },
    {
      name: 'CSS'
    },
    {
      name: 'NodeJS'
    },
    {
      name: 'ExpressJS'
    },
    {
      name: 'VueJS'
    },
    {
      name: 'jQuery'
    },
    {
      name: 'React'
    },
    {
      name: 'Angular'
    },
    {
      name: 'PHP'
    },
    {
      name: 'Laravel'
    },
    {
      name: 'Java'
    },
    {
      name: 'SpringBoot'
    },
    {
      name: 'C#'
    },
  ], {}),

  down: (queryInterface, Sequelize) =>  queryInterface.bulkDelete('Skills', null, {})
};