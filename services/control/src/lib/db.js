const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.resolve(__dirname, '../..', 'db.json'));
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db
  .defaults({
    drivers: {},
    rides: {},
    pendingRides: {},
  })
  .write();

module.exports = db;
