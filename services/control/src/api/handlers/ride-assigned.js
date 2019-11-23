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
  const drivers = db.get('drivers').value();

  try {
    const promises = Object.keys(drivers).map(driverId => {
      if (driverId === message.payload.driver.id) {
        return postSlack({
          text: ':first_place_medal: Congratulations! The ride has been assigned to you.',
          channel: driverId,
          attachments: [
            {
              title: 'Ride identifier',
              text: message.payload.ride.id,
              color: '#008800',
            },
            {
              title: 'Price',
              text: `${message.payload.ride.price} €`,
              color: '#00aaee',
            }
          ],
        });
      }

      return postSlack({
        text: ':disappointed: Oooh! This ride has been assigned to another driver. You gotta be faster next time! :zap:',
        channel: driverId,
      });
    });

    await Promise.all(promises);

    postSlack({
      channel: 'workshop-lille',
      text: `:car::dash: <@${message.payload.driver.id}> is going to pick up <@${message.payload.user.id}> :raised_hands:`,
      attachments: [
        {
          title: 'Ride identifier',
          text: message.payload.ride.id,
          color: '#008800',
        },
        {
          title: 'Price',
          text: `${message.payload.ride.price} €`,
          color: '#00aaee',
        }
      ]
    });
  } catch (e) {
    console.error(e);
  }
};
