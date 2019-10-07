const collections = {
  acceptedRides: {},
};

module.exports.list = (collection) => collections[collection];
module.exports.get = (collection, key) => collections[collection][key];
module.exports.add = (collection, key, value) => {
  collections[collection][key] = value;
  return collections[collection][key];
};
module.exports.update = (collection, key, value) => {
  collections[collection][key] = {
    ...collections[collection][key],
    ...value,
  };
  return collections[collection][key];
};
module.exports.remove = (collection, key) => {
  delete collections[collection][key];
};
