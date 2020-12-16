#!/usr/bin/env node
/* const process = require('process');
const program = require('commander'); */
/* const inquirer = require('inquirer'); */
const colors = require('colors');
const { mdLinks } = require('./md-links.js');
const {
  totalLinks,
  uniqueLinks,
  brokenLinks,
} = require('./stats.js');

colors.setTheme({
  data: 'yellow',
  error: 'red',
});
const path = process.argv[2];
const opValidate = process.argv[3];
const opStats = process.argv[4];

// eslint-disable-next-line no-mixed-operators
if (opValidate === '--validate' && opStats === '--stats' || opStats === '--stats' && opValidate === '--validate' || opValidate === '--s' && opStats === '--v' || opValidate === '--v' && opStats === '--s') {
  mdLinks(path, { validate: true })
    .then((res) => {
      console.log(`Total links:`, `${totalLinks(res)}`.data);
      console.log(`Unique links:`, `${uniqueLinks(res)}`.data);
      console.log(`Broken links:`, `${brokenLinks(res)}`.red);
    })
    .catch((error) => console.log(error.error));
} else if (opValidate === '--validate' || opValidate === '--v') {
  mdLinks(path, { validate: true })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.error(error.error));
  } else if (opValidate === '--help' || opValidate === '--h' || opValidate === ''){
    console.log('You can use these options: ', '--validate, --v:'.data, 'Validate links.', '--stats, --s:'.data, 'Show stats.', '--validate --stats, --v --s:'.data, 'Stats about valid links');
} else if (opValidate === '--stats' || opValidate === '--s') {
  mdLinks(path, { validate: true })
    .then((res) => {
      console.log(`Total links:`, `${totalLinks(res)}`.data);
      console.log(`Unique links:`, `${uniqueLinks(res)}`.data);
    })
    .catch((error) => console.error(error.error));
} else {
  mdLinks(path, { validate: false })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.error(error.error));
}

/* console.log('args', process.argv); */

/* inquirer.prompt({
  name: 'options',
  type: 'list',
  message: 'Hello. How can I help you?',
  choices: ['I want to list my links', 'I want to validate my links',
  'I want to validate my links and some stats'],
})
  .then((answers) => console.log('Answer', answers.options)); */
