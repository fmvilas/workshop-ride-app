const db = require('../../lib/db');
const handler = module.exports = {};

/**
 * Ride accepted
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
handler.rideAccepted = async ({message}) => {
  const rideId = message.payload.rideId;

  if (db.get('pendingRides', rideId)) {
    db.add('rides', rideId, db.get('pendingRides', rideId));
    db.remove('pendingRides', rideId);
    db.update('rides', rideId, {
      driver: db.get('drivers', message.payload.driverId),
    });

    message.reply(db.get('rides', rideId), null, 'ride/assigned');
  }
};
