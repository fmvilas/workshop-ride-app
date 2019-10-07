const Hermes = require('hermesjs');
const app = new Hermes();
const { cyan, gray } = require('colors/safe');
const buffer2string = require('./middlewares/buffer2string');
const string2json = require('./middlewares/string2json');
const json2string = require('./middlewares/json2string');
const logger = require('./middlewares/logger');
const errorLogger = require('./middlewares/error-logger');
const config = require('../lib/config');
const KafkaAdapter = require('hermesjs-kafka');
const rideRequested = require('./routes/ride-requested.js');
const rideAccepted = require('./routes/ride-accepted.js');
const rideAssigned = require('./routes/ride-assigned.js');

app.addAdapter(KafkaAdapter, config.broker.kafka);

app.use(buffer2string);
app.use(string2json);
app.use(logger);

// Channels
app.use(rideRequested);
app.useOutbound(rideAccepted);
app.use(rideAssigned);

app.use(errorLogger);
app.useOutbound(logger);
app.useOutbound(json2string);

app
  .listen()
  .then((adapters) => {
    console.log(cyan.underline(`${config.app.name} ${config.app.version}`), gray('is ready!'), '\n');
    adapters.forEach(adapter => {
      console.log('🔗 ', adapter.name(), gray('is connected!'));
    });
  })
  .catch(console.error);
