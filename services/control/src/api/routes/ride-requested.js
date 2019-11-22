const Router = require('hermesjs/lib/router');
const router = new Router();
const rideRequestedHandler = require('../handlers/ride-requested');
module.exports = router;

/**
 * Ride requested
 */
router.use('ride-requested', async (message, next) => {
  try {
    await rideRequestedHandler.rideRequested({message});
    next();
  } catch (e) {
    next(e);
  }
});
