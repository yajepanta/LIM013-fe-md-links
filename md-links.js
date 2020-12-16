const { parseLinks } = require('./parse-md-files');
const { validate } = require('./options.js');
const {
  isValid,
  transformPath,
  getAllFiles,
  getMarkdownFiles,
} = require('./md-files.js');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (!isValid(path)) {
    reject(new Error('Ruta inválida'));
  }
  const route = transformPath(path);
  if (getAllFiles(route).length === 0) {
    reject(new Error('El directorio está vacío'));
  }
  if (getMarkdownFiles(route).length === 0) {
    reject(new Error('El directorio no tiene archivos markdown'));
  }
  if (!options) {
    resolve(new parseLinks(route));
  }
  if (options.validate) {
    validate(route).then((parsedLinks) => resolve(parsedLinks));
  } else {
    resolve(parseLinks(route));
  }
});

module.exports = {
  mdLinks,
};

// eslint-disable-next-line max-len
/* mdLinks('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets', { validate: true })
  .then((validatelinks) => console.log('links de mdlinks', validatelinks)); */
