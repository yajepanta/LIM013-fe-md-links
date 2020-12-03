/* Debo importar función mdLinks */

/* module.exports = () => { */

  /* módulo fs: nos sirve para interactuar con el sistema de archivos. */
  const fs = require('fs');

  /* módulo path: nos sirve para trabajar con RUTAS de archivos y directorios */
  const path = require('path');

  /* \\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links;
  E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets\\hola.md */
   const route = "\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets";

  /* Comprobamos que existe "path", path puede ser string, objeto URL o Buffer(bits). Método síncrono, no recibe callback
  Retorna un boolean */
  const isValid = fs.existsSync(route);
  console.log("must be true", isValid);

  /*  const isAbsolute = path.isAbsolute(route);
      const transformedPath = path.resolve(route);
   -> A TypeError is thrown if path is not a string. -> Output Error
   
   Debe devolver un string*/
  const transformPath = (route) => {
    if (!path.isAbsolute(route)) {
      return route ;
    }
    else {
      /* The resulting path is normalized */
      return path.resolve(route);
    }
  };
/* should be a string */
  const absolutePath = transformPath(route);
  console.log("should return an absolute", absolutePath);

/*   console.log(fs.readdirSync("E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links\\Assets")); */

/* __dirname is an environment variable de NODE that tells you the absolute path of the directory containing the currently executing file. */
  const getAllFiles = (dirPath, arrayOfFiles) => {
    files = fs.readdirSync(dirPath)
    /* 1: es undefined. por que? es el segundo parámetro que recibe la función pero no tiene nada aún, no está definido. */
    console.log("1", arrayOfFiles);

    arrayOfFiles = arrayOfFiles || []

    /* 2: acá ya definimos el 2do parámetro con un array vacío, y empieza a ser vacío de ahí en adelante*/
    console.log("2", arrayOfFiles);

    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {

        /* acá array of files debería ser vacío la primera vez */
        console.log("3", arrayOfFiles);

        /* como es directorio, vuelvo a ejecutar la función con el path y el array vacío */
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);

        /* acá se llenaría recién la segunda vez. argumento: la dirección exacta del path analizado, y agregando el array vacío */
        console.log("4", arrayOfFiles);

      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })

    /* debería ser igual a todos los archivos listados */
    console.log("5", arrayOfFiles);
    return arrayOfFiles
  }

  const allFiles = getAllFiles(absolutePath);
  console.log("final", allFiles );
 
  /* Retorna un string con la porción desde el . hasta el final
  si no hay punto, o sea si es dir?, retorna un string vacío 
  isMarkdown: 
    es funcion, argumento: array de strings
    debe iterar cada elemento del array, o sea cada ruta, y sacar el path.extname para comparar si es .md
    debe guardar la ruta de todos files que cumplan con = .md en otro array de strings
    return: array con files md
  */
 
  const isMarkdown = (files) => {
    
    /* diferenciar bien entre foreach y map. map nocambia el array, foreach tmpo, map se puede almacenar. foreach? */
    const arrayOfFiles = files.filter((file) => path.extname(file) == '.md');
    return arrayOfFiles;

  }
  /*  LF will be replaced by CRLF in package.json. */
  console.log("soy markdown GAA", isMarkdown(allFiles));
 
 
  /* 
  fs.statSync(path[, options])
  options <Object>
    bigint <boolean> Whether the numeric values in the returned fs.Stats object should be bigint. Default: false.
    throwIfNoEntry <boolean> Whether an exception will be thrown if no file system entry exists, rather than returning undefined. Default: true.

Retorna el objeto fs.Stats que tiene la info dobre un archivo.*/
  
/* console.log("Path is file:", fs.statSync(absolutePath).isFile()); 
console.log("Path is directory:", fs.statSync(absolutePath).isDirectory());  */

/* fs.readdirSync(path[, options]) 
Almacenar nueva ruta? 
Retorna arreglo de strings con los nombres de los files adentro
Puedo poner que si es directorio, siga accediendo, y si no, que liste el nombre del file*/

  /* SÍ VA ESTO const isEmpty = fs.readdirSync(route); */ 

 
  
  /*  entonces:
  podría de una vez analizar todos los archivos dentro, y si isEmpty.length es 0 -> Error: El directorio está vacío
  
  si es directorio, debe entrar y hacer la función recursiva archivo por archivo
    cada archivo examinado pasará por las opciones validate, stats
  si es file, pasa directo a ser analizado
     si es markdown, se le aplican las opciones
  creamos un array de objetos donde pondremos cada objeto con propiedades del link de .md

  pseudocódigo
  if file.length=vacio: return error.
  else: debe entrar a cada file y comprobar isDir isFile, recibe como parametro la ruta
        foreach retorno de fxqueleecontenido fs.readdirSync ( (para cada file) => { 
                                                          if isDir: if ( fs.statSync(route + "\\" + file).isDirectory() )
                                                          else isFile: analizar si es .md y guardar el path
  })
 
  */
/* }; */
/* /\W(md)/ */
module.exports = isValid, absolutePath;
