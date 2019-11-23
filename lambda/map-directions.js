const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

async function handler(event, context, callback) {
  try {
    const qs = event.queryStringParameters;
    const gmapsDirectionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(qs.from)}&destination=${encodeURIComponent(qs.to)}&mode=driving&key=${process.env.GMAPS_KEY}`;
    const gmapsStaticApiUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&key=${process.env.GMAPS_KEY}&path=`;

    await axios({
      url: gmapsDirectionsApiUrl,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((response) => {
        callback(null, {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: response.status,
          body: {
            url: `${gmapsStaticApiUrl}${response.data.routes[0].overview_polyline.points}`
          }
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