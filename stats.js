const totalLinks = (array) => {
  const total = array.length;
  return total;
};

/* Un valor en un Set sólo puede estar una vez */
const uniqueLinks = (array) => {
  const unique = [...new Set(array.map((link) => link.href))];
  return unique.length;
};

const brokenLinks = (array) => {
  const broken = array.filter((link) => link.status === 404 || link.statusText === 'fail');
  return broken.length;
};
module.exports = {
  totalLinks,
  uniqueLinks,
  brokenLinks,
};
