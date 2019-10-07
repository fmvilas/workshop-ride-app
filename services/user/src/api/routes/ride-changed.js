const Router = require('hermesjs/lib/router');
const router = new Router();
const rideChangedHandler = require('../handlers/ride-changed');
module.exports = router;

/**
 * Ride status changed
 */
router.use('ride/changed', async (message, next) => {
  try {
    await rideChangedHandler.rideChanged({message});
    next();
  } catch (e) {
    next(e);
  }
});
