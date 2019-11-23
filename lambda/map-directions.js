const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

async function handler(event, context, callback) {
  try {
    const qs = event.queryStringParameters;
    const gmapsDirectionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=Grodno&destination=Minsk&mode=driving&key=${process.env.GMAPS_KEY}`;

    await axios({
      url: gmapsDirectionsApiUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        callback(null, {
          statusCode: response.status,
          body: JSON.stringify(response.data)
        });
      }).catch((error) => {
        console.log(error);
        callback(error);
      });
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: e.message,
    };
  }
}

module.exports.handler = handler;