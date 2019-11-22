const Router = require('hermesjs/lib/router');
const router = new Router();
const driverRegisteredHandler = require('../handlers/driver-registered');
module.exports = router;

router.use('driver-registered', async (message, next) => {
  try {
    await driverRegisteredHandler.onDriverRegistered({message});
    next();
  } catch (e) {
    next(e);
  }
});
