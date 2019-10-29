const Router = require('hermesjs/lib/router');
const router = new Router();
const participantAddedHandler = require('../handlers/participant-added');
module.exports = router;

router.use('participant/added', async (message, next) => {
  try {
    await participantAddedHandler.onParticipantAdded({message});
    next();
  } catch (e) {
    next(e);
  }
});
