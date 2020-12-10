const { parseLinks } = require('./parse-md-files');
const { validate, stats } = require('./options.js');

/* POR QUÉ CUANDO USABA PROMESAS DE FIREBASE, PODIA RETORNAR UN CONSOLE.LOG? */

parseLinks('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets');
validate('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets').then((res) => {
  console.log('soy el.then del final', res);
  return res;
});

console.log('total links', stats('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets'));
