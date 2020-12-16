/* const mdLinks = require('../'); */
const isValid = require('../md-files.js');
const isAbsolute = require('../md-files.js');
const transformedPath = require('../md-files.js');
/* describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
Cannot log after tests are done. Did you forget to wait for something async in your test?
}); */

describe('isValid', () => {
  test('should be a function', () => {
    expect(typeof isValid).toBe('function');
  });
  test('valid path should be true', () => {
    expect(isValid('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links')).toBe(true);
  });
  test('invalid path should be true', () => {
    expect(isValid('Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links')).toBe(true);
  });
  test('invalid path should return false', () => {
    expect(isValid('LIM013-fe-md-links')).toBe(false);
  });
});

describe('isAbsolute', () => {
  test('should be a function', () => {
    expect(typeof isAbsolute).toBe('function');
  });
  test('absolute path should return true', () => {
    expect(isAbsolute('E:\\Mis Documentos\\Laboratoria\\mdlinks\\LIM013-fe-md-links')).toBe(true);
  });
  test('relative path should return false', () => {
    expect(isAbsolute('LIM013-fe-md-links')).toBe(false);
  });
});

describe('transformedPath', () => {
  test('should be a function', () => {
    expect(typeof transformedPath).toBe('function');
  });
/* si no tiene / la ruta inicial, la ruta transformada deberia tener? */
});
