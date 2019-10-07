const Hermes = require('hermesjs');
const brokerApp = new Hermes();
const clientApp = new Hermes();
const { cyan, gray } = require('colors/safe');
const buffer2string = require('./middlewares/buffer2string');
const string2json = require('./middlewares/string2json');
const json2string = require('./middlewares/json2string');
const logger = require('./middlewares/logger');
const errorLogger = require('./middlewares/error-logger');
const config = require('../lib/config');
const KafkaAdapter = require('hermesjs-kafka');
const WsAdapter = require('hermesjs-ws');
const rideRequested = require('./routes/ride-requested.js');

brokerApp.addAdapter(KafkaAdapter, config.broker.kafka);
clientApp.addAdapter(WsAdapter, config.ws);

brokerApp.use(buffer2string);
brokerApp.use(string2json);
brokerApp.use(logger);
clientApp.use(buffer2string);
clientApp.use(string2json);
clientApp.use(logger);

// Channels
brokerApp.useOutbound(rideRequested);
brokerApp.use('ride/assigned', (message, next) => {
  clientApp.send(message.payload, message.headers, 'ride/assigned');
  next();
});
clientApp.use('ride/requested', (message, next) => {
  brokerApp.send(message.payload, message.headers, 'ride/requested');
  next();
});

brokerApp.use(errorLogger);
brokerApp.useOutbound(logger);
brokerApp.useOutbound(json2string);
clientApp.use(errorLogger);
clientApp.useOutbound(logger);
clientApp.useOutbound(json2string);

Promise
  .all([brokerApp.listen(), clientApp.listen()])
  .then(([[kafkaAdapter], [wsAdapter]]) => {
    console.log(cyan.underline(`${config.app.name} ${config.app.version}`), gray('is ready!'), '\n');
    console.log('🔗 ', wsAdapter.name(), gray('is connected!'));
    console.log('🔗 ', kafkaAdapter.name(), gray('is connected!'));
  })
  .catch(console.error);
