const Router = require('hermesjs/lib/router');
const router = new Router();
const rideAcceptedHandler = require('../handlers/ride-accepted');
module.exports = router;

/**
 * Ride accepted
 */
router.use('ride-accepted', async (message, next) => {
  try {
    await rideAcceptedHandler.rideAccepted({message});
    next();
  } catch (e) {
    next(e);
  }
});
