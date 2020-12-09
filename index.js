/* Debo importar función mdLinks */

/* module.exports = () => { */

/* module fs: interacts with file system. */
const fs = require('fs');
/* module path: works with files and directories */
const path = require('path');
/* library for parsing .md */
const marked = require('marked');
/* object that parses html */
const { Renderer } = require('marked');
/* fetch */
const fetch = require('node-fetch');

const routetest = 'E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets';

/* Function to validate path. Returns boolean. */
const isValid = (route) => fs.existsSync(route);
console.log('must be true', isValid(routetest));

/* must return an absolute path (string) */
const transformPath = (route) => {
  if (!path.isAbsolute(route)) {
    return route;
  }
  /* The resulting path is normalized */
  return path.resolve(route);
};

/* String with the transformed path */
const absolutePath = transformPath(routetest);
console.log('should return an absolute', absolutePath);

/* recursive function
Args: route (absolute path) / arrayOfFiles (files in directory)
1. Is Dir:-read dir -> return array of only names
          -read names (as a path)
              -> if is directory, arrayOfFiles retorna al caso base con el path
                                        del directorio + arrayOfFiles
                                        luego vuelve a ver si es directorio o file
              -> if is file, push path of file with path.join(),
                 joins all given path using the separator, then normalizes the path.
2. Is File: push path of file
¿Qué pasa si después del file justo está colocado el directorio? */

/* __dirname is an environment variable de NODE that tells you the absolute path
of the directory containing the currently executing file. */

/* CUANDO ARRAYOFFILES.LENGTH SEA 0? => console.log('la ruta no tiene archivos .md') */

/* Object fs.Stats has file info. Method: isDirectory/isFile */
const getAllFiles = (route, arrayOfFiles) => {
  arrayOfFiles = [];

  /* if is a directory */
  if (fs.statSync(route).isDirectory()) {
    const files = fs.readdirSync(route);
    files.forEach((file) => {
      if (fs.statSync(`${route}/${file}`).isDirectory()) {
        arrayOfFiles = getAllFiles(`${route}/${file}`, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(route, '/', file));
      }
    });
  }

  /* if is a file */
  if (fs.statSync(route).isFile()) {
    arrayOfFiles.push(route);
  }
  return arrayOfFiles;
};

/* Run getAllFiles */
const allFiles = getAllFiles(absolutePath);

/* Argument: array of files of path. Returns an array of .md files.  */
const isMarkdown = (files) => {
  /* path.extname returns the string between . and the end. including '
.'
 */
  const arrayOfFiles = files.filter((file) => path.extname(file) == '.md');
  return arrayOfFiles;
};

/* Run isMarkdown with the array of files */
const mdFiles = isMarkdown(allFiles);

if (mdFiles.length === 0) {
  console.log('error, no hay archivos markdown');
}

/*  LF will be replaced by CRLF in package.json. */
console.log('soy markdown', mdFiles);

/*  Argument: array de rutas .md
Returns array with links properties
readLinks */
const readLinks = (routes) => {
  const linksProperties = [];
  /*  Return an array with the content (string) of every path file (string) */
  routes.forEach((file) => {
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

console.log('array de objetos con propiedades de links', readLinks(mdFiles));

const linksProperties = readLinks(mdFiles);

const options = {
  /* Booleano que determina si se desea validar los links encontrados. */
  validate: (links) => {
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
    console.log('pending promises', arrayOfPromises);
    return Promise.all(arrayOfPromises);
  },

  stats: (links) => links.length,
};

/* console.log(options.validate(linksProperties)); */

/* POR QUE CUANDO USABA PROMESAS DE FIREBASE, PODIA RETORNAR UN CONSOLE.LOG? */
options.validate(linksProperties).then((res) => {
  console.log('soy el.then del final', res);
  return res;
});

console.log('total links', options.stats(linksProperties));

/* BOTA UN objeto RESPONSE, con propiedades: url es el href  status: 200 statusText OK counter 0 */
/*  console.log('VALIDATE', result); */

/* module.exports = isValid, absolutePath; */

/* 1. Necesito una función que lea 1 por 1 cada ruta del array de rutas md
2. Que de cada ruta, renderice el href, text en un objeto y lo envie a un array. 
3. Debe retornarme ese array de objetos
Conclusión: 1 gran función que reciba el array de rutas, itere file por file,
 y dentro incluir la función que lee y la función que renderiza
 */

/* console.log('Path is file:', fs.statSync(absolutePath).isFile()); 
console.log('Path is directory:', fs.statSync(absolutePath).isDirectory());  */

/* fs.readdirSync(path[, options])
  Almacenar nueva ruta?
  Retorna arreglo de strings con los nombres de los files adentro
  Puedo poner que si es directorio, siga accediendo, y si no, que liste el nombre del file  */

/* SÍ VA ESTO const isEmpty = fs.readdirSync(route); */

/*  entonces: podría de una vez analizar todos los archivos dentro,
y si isEmpty.length es 0 -> Error: El directorio está vacío

  si es directorio, debe entrar y hacer la función recursiva archivo por archivo
    cada archivo examinado pasará por las opciones validate, stats
  si es file, pasa directo a ser analizado
     si es markdown, se le aplican las opciones
  creamos un array de objetos donde pondremos cada objeto con propiedades del link de .md

  pseudocódigo
  if file.length=vacio: return error.
  else: debe entrar a cada file y comprobar isDir isFile, recibe como parametro la ruta
        foreach retorno de  fs.readdirSync ( (para cada file) =>    {
                                     if isDir: if ( fs.statSync(route + '\\'+ file).isDirectory() )
                                    else isFile: analizar si es .md y guardar el path
                                    })

  */
