const fetch = require('node-fetch');

module.exports = async (body) => {
  const res = await fetch('https://gracious-lumiere-20f9f1.netlify.com/.netlify/functions/post-slack', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.json();
};
