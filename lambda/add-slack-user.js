const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');
const qs = require('qs');

dotenv.config();

async function handler(event, context, callback) {
  try {
    event.body = qs.parse(event.body);
    // { token: 'xxxxxxxxxxxxxxxxxxx',
    // team_id: 'T34F2JRQU',
    // team_domain: 'asyncapi',
    // channel_id: 'GP2DTFU4D',
    // channel_name: 'privategroup',
    // user_id: 'U34F2JRRS',
    // user_name: 'fmvilas',
    // command: '/ride',
    // text: 'me as driver',
    // response_url: 'https://hooks.slack.com/commands/T34F2JRQU/801549252499/xxxxxxxxxxxx',
    // trigger_id: '812555514372.106512637844.19b1b3760ca9e2e3938177b348049433' }

    const { command, text, user_name, user_id, response_url } = event.body;
    if (command !== '/ride') {
      return callback(null, {
        statusCode: 200,
        body: 'OK',
      });
    }

    if (!text.match(/^me as (driver|user)$/)) {
      try {
        await axios.post(response_url, {
          text: 'I could not understand what you said. Usage is `/ride me as [user/driver]`.',
          response_type: 'ephemeral',
        });
      } catch (e) {
        return callback(e);
      }

      return callback(null, {
        statusCode: 200,
        body: 'OK',
      });
    }

    const type = text.split(' ')[2];

    try {
      await axios.post(response_url, {
        text: `Welcome to Ride! You've been added as a ${type}.`,
        response_type: 'ephemeral',
      });
    } catch (e) {
      return callback(e);
    }
    
    const client = new Kafka({
      brokers: [process.env.KAFKA_HOST],
      clientId: 'publisher-kafka-lambda',
      ssl: {
        rejectUnauthorized: true
      },
      sasl: {
        mechanism: 'SCRAM-SHA-256',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      },
    });

    const producer = client.producer();  
    const rideId = Number(callbackId[callbackId.length - 1]);
    await producer.connect();
    await producer.send({
      topic: 'qw7yecbj-user__added',
      messages: [{
        value: JSON.stringify({
          rideId,
          driverId: event.body.payload.user.id,
        })
      }],
    });

    callback(null, {
      statusCode: 200,
      body: 'OK',
    });
  } catch (e) {
    console.error(e);
    callback(e);
  }
}

module.exports.handler = handler;