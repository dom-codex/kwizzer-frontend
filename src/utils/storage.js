module.exports.storeData = (type, data) => {
  localStorage.setItem(type, data);
};
module.exports.fetchData = (key) => {
  return localStorage.getItem(key);
};
module.exports.clearData = (key) => {
  localStorage.removeItem(key);
};
