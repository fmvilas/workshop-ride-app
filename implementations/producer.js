#!/usr/bin/env node

const Kafka = require('node-rdkafka');
var producer = new Kafka.Producer({
  //'debug' : 'all',
  'metadata.broker.list': process.env.KAFKA_HOST,
  'security.protocol': 'SASL_SSL',
  'ssl.endpoint.identification.algorithm': 'https',
  'sasl.mechanism': 'PLAIN',
  'sasl.username': process.env.KAFKA_USERNAME,
  'sasl.password': process.env.KAFKA_PASSWORD,
  'dr_cb': true,
});

var topicName = 'test-topic';

//logging debug messages, if debug is enabled
producer.on('event.log', function (log) {
  console.log(log);
});

//logging all errors
producer.on('event.error', function (err) {
  console.error('Error from producer');
  console.error(err);
});

producer.on('delivery-report', function (err, report) {
  console.log('delivery-report: ' + JSON.stringify(report));
  counter++;
});

//Wait for the ready event before producing
producer.on('ready', function (arg) {
  producer.produce(topicName, 0, Buffer.from('testing'), null, Date.now(), "", null);
  console.log('Message sent!');
});

producer.on('disconnected', function (arg) {
  console.log('Disconnected!');
});

producer.connect();