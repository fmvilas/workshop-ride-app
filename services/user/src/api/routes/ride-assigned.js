const Router = require('hermesjs/lib/router');
const router = new Router();
const rideAssignedHandler = require('../handlers/ride-assigned');
module.exports = router;

/**
 * Ride assigned
 */
router.use('ride/assigned', async (message, next) => {
  try {
    await rideAssignedHandler.rideAssigned({message});
    next();
  } catch (e) {
    next(e);
  }
});
