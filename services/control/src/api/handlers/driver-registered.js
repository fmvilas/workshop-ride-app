const db = require('../../lib/db');
const postSlack = require('../../lib/post-slack');
const handler = module.exports = {};

/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {object} options.message.payload.driver
 * @param {string} options.message.payload.driver.id - Id of the driver.
 * @param {string} options.message.payload.driver.fullName
 */
handler.onDriverRegistered = async ({message}) => {
  db.set(`drivers.${message.payload.driver.id}`, message.payload.driver).write();

  postSlack({
    text: `:wave: Welcome to Ride, ${message.payload.driver.fullName}. You're registered as a driver now :racing_car:`,
    channel: message.payload.driver.id,
  });
};
