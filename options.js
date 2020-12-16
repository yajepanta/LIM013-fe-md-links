/* fetch */
const fetch = require('node-fetch');
const { parseLinks } = require('./parse-md-files');

/* POR QUÉ CUANDO USABA PROMESAS DE FIREBASE, PODIA RETORNAR UN CONSOLE.LOG? */
module.exports = {
  validate: (route) => {
    const links = parseLinks(route);
    const arrayOfPromises = [];
    links.forEach((link) => {
      arrayOfPromises.push(fetch(link.href)
        .then((response) => ({
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          statusText: response.statusText,
        }))
        .catch(() => ({
          href: link.href,
          text: link.text,
          file: link.file,
          status: 404,
          statusText: 'fail',
        })));
    });
    /* console.log('pending promises', arrayOfPromises); */
    return Promise.all(arrayOfPromises);
  },

  /* stats: (links) => links.length, */
};
