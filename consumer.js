#!/usr/bin/env node

const Kafka = require('node-rdkafka');
var consumer = new Kafka.KafkaConsumer({
  // 'debug': 'all',
  'metadata.broker.list': process.env.KAFKA_HOST,
  'security.protocol': 'SASL_SSL',
  'ssl.endpoint.identification.algorithm': 'https',
  'sasl.mechanism': 'PLAIN',
  'sasl.username': process.env.KAFKA_USERNAME,
  'sasl.password': process.env.KAFKA_PASSWORD,
  'group.id': 'node-rdkafka-consumer-flow-example',
  'enable.auto.commit': false,
});

var topicName = 'test-topic';

//logging debug messages, if debug is enabled
consumer.on('event.log', function (log) {
  console.log(log);
});

//logging all errors
consumer.on('event.error', function (err) {
  console.error('Error from consumer');
  console.error(err);
});

consumer.on('ready', function (arg) {
  console.log('Connected!');
  consumer.subscribe([topicName]);
  consumer.consume();
});

consumer.on('data', function (m) {
  console.log(m.value.toString());
});

consumer.on('disconnected', function (arg) {
  console.log('Disconnected!');
});

consumer.connect();