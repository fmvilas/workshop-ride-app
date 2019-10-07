#!/usr/bin/env node

const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

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

const run = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [{
        value: JSON.stringify({
          user: {
            id: 'fmvilas',
            fullName: 'Fran Mendez'
          },
          ride: {
            id: 4,
          }
        })
      }],
    });
    console.log('Message sent!');
  } catch (e) {
    console.error(e);
  }
};

run();
