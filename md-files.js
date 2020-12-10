/* module fs: interacts with file system. */
const fs = require('fs');
/* module path: works with files and directories */
const path = require('path');
/* library for parsing .md */

/* Function to validate path. Returns boolean. */
const isValid = (route) => fs.existsSync(route);

/* must return an absolute path (string) */
const transformPath = (route) => {
  if (!path.isAbsolute(route)) {
    return route;
  }
  /* The resulting path is normalized */
  return path.resolve(route);
};

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

/* Argument: array of files of path. Returns an array of .md files.  */
const isMarkdown = (route) => {
  /* Run getAllFiles */
  const allFiles = getAllFiles(route);
  /* path.extname returns the string between . and the end, including '.' */
  const arrayOfFiles = allFiles.filter((file) => path.extname(file) === '.md');
  return arrayOfFiles;
};

console.log('Array de archivos Markdown:', isMarkdown('\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets'));

module.exports = {
  isValid,
  transformPath,
  getAllFiles,
  isMarkdown,
};
