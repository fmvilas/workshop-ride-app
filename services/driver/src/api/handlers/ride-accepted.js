const db = require('../../lib/db');
const handler = module.exports = {};

/**
 * Ride accepted
 * @param {object} options
 * @param {object} options.message
 * @param {integer} options.message.payload.rideId - Id of the ride.
 * @param {string} options.message.payload.driverId - Id of the driver.
 */
handler.rideAccepted = async ({message}) => {
  const { rideId, driverId } = message.payload;
  db.add('acceptedRides', rideId, { driverId });
};
