
const handler = module.exports = {};

/**
 * Ride requested
 * @param {object} options
 * @param {object} options.message
 * @param {object} options.message.payload.user
 * @param {string} options.message.payload.user.id - Id of the user.
 * @param {string} options.message.payload.user.fullName
 * @param {object} options.message.payload.ride
 * @param {string} options.message.payload.ride.id - Id of the user.
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
handler.rideRequested = async ({message}) => {
  // Implement your business logic here...
};
