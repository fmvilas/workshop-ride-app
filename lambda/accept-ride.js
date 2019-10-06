const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');

dotenv.config();

async function handler(event, context, callback) {
  const client = new Kafka({
    brokers: [process.env.KAFKA_HOST],
    clientId: 'publisher-kafka-lambda',
    ssl: {
      rejectUnauthorized: true
    },
    sasl: {
      mechanism: 'plain',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  });
  const producer = client.producer();

  try {
    const callbackId = event.callback_id.split('_');
    const rideId = Number(callbackId[callbackId.length - 1]);
    await producer.connect();
    await producer.send({
      topic: 'ride__accepted',
      messages: [{
        value: JSON.stringify({
          rideId,
          driverId: event.user.id,
        })
      }],
    });
    callback(null, {
      statusCode: 200,
      body: 'OK'
    });
  } catch (e) {
    callback(e, {
      statusCode: 500,
      body: 'Unexpected Error'
    });
  }
}

module.exports.handler = handler;