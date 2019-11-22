const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');
const qs = require('qs');

dotenv.config();

async function handler(event, context) {
  try {
    event.body = qs.parse(event.body);
    event.body.payload = JSON.parse(event.body.payload);
    
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
    const callbackId = event.body.payload.callback_id.split('_');
    const rideId = Number(callbackId[callbackId.length - 1]);
    await producer.connect();
    await producer.send({
      topic: 'qw7yecbj-ride-accepted',
      messages: [{
        value: JSON.stringify({
          rideId,
          driverId: event.body.payload.user.id,
        })
      }],
    });
    return {
      statusCode: 200,
      body: `:tada: Awesome! I'm going to try get this ride for you. Hold on...`,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: e.message,
    };
  }
}

module.exports.handler = handler;