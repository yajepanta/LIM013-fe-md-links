/* module fs: interacts with file system. */
const fs = require('fs');
/* library for parsing .md */
const marked = require('marked');
/* object that parses html */
const { Renderer } = require('marked');
const { isMarkdown } = require('./md-files.js');
/*  Argument: array de rutas .md
Returns array with links properties
readLinks */
const parseLinks = (route) => {
  const mdFiles = isMarkdown(route);
  const linksProperties = [];
  /*  Return an array with the content (string) of every path file (string) */
  mdFiles.forEach((file) => {
    /* Puede estar VACÍO: output: error, archivo vacío. string vacío.
    cuando tooodo textFile es vacio, deberia dar error */

    /* Read the file and returns a string with the content */
    const contentFile = fs.readFileSync(file, 'utf-8');
    const renderer = {
      link(href, title, text) {
        const objectProperty = {
          href,
          text: text.slice(0, 49),
          file,
        };
        linksProperties.push(objectProperty);
      },
    };
      /* marked uses option RENDERER */
    marked.use({ renderer });

    /* run marked with the content, but in html */
    marked(contentFile);
  });
  return linksProperties;
};

console.log('Array de objetos con propiedades de links:', parseLinks('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets'));

module.exports = { parseLinks };
