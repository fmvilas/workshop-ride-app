const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');

dotenv.config();

async function handler(event, context, callback) {
  console.log(event);
  const client = new Kafka({
    brokers: [process.env.KAFKA_HOST],
    clientId: 'ABC',
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
    await producer.connect();
    await producer.send({
      topic: event.topic,
      messages: event.messages,
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