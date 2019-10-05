import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export async function handler(event, context, callback) {
  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  const SLACK_POST_MESSAGE_ENDPOINT = 'https://slack.com/api/chat.postMessage';
  const payload = JSON.parse(event.body);

  await axios({
    url: SLACK_POST_MESSAGE_ENDPOINT,
    method: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SLACK_TOKEN}`,
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
    })
}