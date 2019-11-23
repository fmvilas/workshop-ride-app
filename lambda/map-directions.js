const crypto = require('crypto');
const url = require('url');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

/**
 * Convert from 'web safe' base64 to true base64.
 *
 * @param  {string} safeEncodedString The code you want to translate
 *                                    from a web safe form.
 * @return {string}
 */
function removeWebSafe(safeEncodedString) {
  return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
}

/**
 * Convert from true base64 to 'web safe' base64
 *
 * @param  {string} encodedString The code you want to translate to a
 *                                web safe form.
 * @return {string}
 */
function makeWebSafe(encodedString) {
  return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * Takes a base64 code and decodes it.
 *
 * @param  {string} code The encoded data.
 * @return {string}
 */
function decodeBase64Hash(code) {
  // "new Buffer(...)" is deprecated. Use Buffer.from if it exists.
  return Buffer.from ? Buffer.from(code, 'base64') : new Buffer(code, 'base64');
}

/**
 * Takes a key and signs the data with it.
 *
 * @param  {string} key  Your unique secret key.
 * @param  {string} data The url to sign.
 * @return {string}
 */
function encodeBase64Hash(key, data) {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
}

/**
 * Sign a URL using a secret key.
 *
 * @param  {string} path   The url you want to sign.
 * @param  {string} secret Your unique secret key.
 * @return {string}
 */
function sign(path, secret) {
  const uri = url.parse(path);
  const safeSecret = decodeBase64Hash(removeWebSafe(secret));
  const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret, uri.path));
  return url.format(uri) + '&signature=' + hashedSignature;
}

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
          body: JSON.stringify({
            url: sign(`${gmapsStaticApiUrl}${encodeURIComponent(response.data.routes[0].overview_polyline.points)}`)
          })
        });
      }).catch((error) => {
        console.error(error);
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