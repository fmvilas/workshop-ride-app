const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');
const qs = require('qs');

dotenv.config();

async function handler(event, context) {
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

    const { command, text, user_name, user_id } = event.body;
    if (command !== '/ride') {
      return {
        statusCode: 400,
        body: 'Sorry, I only understand /ride command.',
      };
    }

    let type;

    if (text.match(/^me$/)) {
      type = 'user';
    } else if (text.match(/^drive$/)) {
      type = 'driver';
    } else {
      return {
        statusCode: 200,
        body: ':face_palm: I could not understand what you said. Usage is `/ride me|drive`. E.g., `/ride me` requests a ride for you and `/ride drive` registers you as a driver.',
      };
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
    await producer.connect();
    if (type === 'driver') {
      await producer.send({
        topic: 'qw7yecbj-driver-registered',
        messages: [{
          value: JSON.stringify({
            driver: {
              id: user_id,
              fullName: user_name,
            },
          })
        }],
      });
    } else if (type === 'user') {
      await producer.send({
        topic: 'qw7yecbj-ride-requested',
        messages: [{
          value: JSON.stringify({
            user: {
              id: user_id,
              fullName: user_name,
            },
            ride: {
              id: Date.now(),
              from: {
                latitude: 2,
                longitude: 1,
              },
              to: {
                latitude: 3,
                longitude: 1,
              },
              price: 30,
            },
            sentAt: new Date().toISOString(),
          })
        }],
      });
    }
    producer.disconnect();

    return {
      statusCode: 200,
      body: `:wave: Welcome to Ride, ${user_name}! You've been added as a ${type}.`,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: 'Something went wrong on the add-slack-user function. Check out logs for more information.',
    };
  }
}

module.exports.handler = handler;