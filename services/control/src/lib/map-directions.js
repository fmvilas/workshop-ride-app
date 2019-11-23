const fetch = require('node-fetch');

module.exports = async (from, to) => {
  const res = await fetch(`https://gracious-lumiere-20f9f1.netlify.com/.netlify/functions/map-directions?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  return res.json();
};
