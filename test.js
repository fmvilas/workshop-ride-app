const postSlack = require('./functions/post-slack');

postSlack.handler({ body: JSON.stringify({
  text: 'works!',
  channel: 'workshop',
})}, null, (err, response) => {
  if (err) return console.error(err);
  console.log(response);
});