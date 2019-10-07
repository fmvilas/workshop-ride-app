const fetch = require('node-fetch');
const handler = module.exports = {};

/**
 * Ride status changed
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
 * @param {string} options.message.payload.ride.status - Status of the ride.
 * @param {string} options.message.payload.sentAt - Date and time when the message was sent.
 */
handler.rideChanged = async ({message}) => {
  fetch('https://gracious-lumiere-20f9f1.netlify.com/.netlify/functions/post-slack', {
    method: 'POST',
    body: JSON.stringify({
      text: `Ride ${message.payload.ride.id} has been ${message.payload.ride.status}.`,
      channel: 'workshop'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => { throw err; });
};
