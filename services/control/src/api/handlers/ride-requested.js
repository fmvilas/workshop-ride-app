const postSlack = require('../../lib/post-slack');
const db = require('../../lib/db');
const handler = module.exports = {};

handler.rideRequested = async ({message}) => {
  const drivers = db.list('drivers');
  const user = db.get('users', message.payload.user.id);

  db.add('pendingRides', message.payload.ride.id, {
    user,
    ride: message.payload.ride,
  });

  await postSlack({
    text: `${user.fullName} has requested a ride. Polling drivers...`,
    channel: 'workshop',
  });

  await Promise.all(Object.keys(drivers).map(driverId => postSlack({
    text: `${user.fullName} has requested a ride.`,
    channel: `@${driverId}`,
    attachments: [{
      text: 'Do you want to take it?',
      fallback: 'You are unable to take the ride.',
      callback_id: `accept_response_${Date.now()}_${message.payload.ride.id}`,
      color: '#3AA3E3',
      attachment_type: 'default',
      actions: [
        {
          name: 'response',
          text: 'I want to take it!',
          type: 'button',
          style: 'primary',
          value: 'accept',
        }
      ]
    }]
  })));
};
