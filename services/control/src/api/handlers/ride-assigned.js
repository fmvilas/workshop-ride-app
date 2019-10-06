const postSlack = require('../../lib/post-slack');
const db = require('../../lib/db');
const handler = module.exports = {};

/**
 * Ride assigned
 * @param {object} options
 * @param {object} options.message
 * @param {object} options.message.payload.user
 * @param {integer} options.message.payload.user.id - Id of the user.
 * @param {string} options.message.payload.user.fullName
 * @param {object} options.message.payload.driver
 * @param {integer} options.message.payload.driver.id - Id of the driver.
 * @param {string} options.message.payload.driver.fullName
 * @param {object} options.message.payload.ride
 * @param {integer} options.message.payload.ride.id - Id of the ride.
 * @param {object} options.message.payload.ride.from
 * @param {number} options.message.payload.ride.from.latitude - Latitude of the starting point.
 * @param {number} options.message.payload.ride.from.longitude - Longitude of the starting point.
 * @param {string} options.message.payload.ride.from.friendlyName - Human-friendly name of the location.
 * @param {object} options.message.payload.ride.to
 * @param {number} options.message.payload.ride.to.latitude - Latitude of the starting point.
 * @param {number} options.message.payload.ride.to.longitude - Longitude of the starting point.
 * @param {string} options.message.payload.ride.to.friendlyName - Human-friendly name of the location.
 * @param {number} options.message.payload.ride.price - Price of the ride in Euros.
 * @param {string} options.message.payload.sentAt - Date and time when the message was sent.
 */
handler.rideAssigned = async ({message}) => {
  postSlack({
    text: `Ride #${message.payload.ride.id} (requested by ${message.payload.user.fullName}) has been assigned to driver ${message.payload.driver.fullName}.`,
    channel: 'workshop',
  });

  postSlack({
    text: `:parrot: Yay! You have been assigned the ride #${message.payload.ride.id}. You can now go to pick up ${message.payload.user.fullName}.`,
    channel: `@${message.payload.driver.id}`,
  });

  const drivers = db.list('drivers');

  await Promise.all(Object.keys(drivers).map(driverId => {
    if (driverId === message.payload.driver.id) return;

    return postSlack({
      text: `Sorry, you lost the ride #${message.payload.ride.id}. Keep trying!`,
      channel: `@${driverId}`,
    });
  }));
};
