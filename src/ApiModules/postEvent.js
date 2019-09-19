import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export default function postEvent(location, date) {
  const url = URI(`${requestUrl}/events`);

  const body = `location=${location}&date=${date}`;

  return fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body,
  })
    .then(res => res.json())
    .then(res => res.data);
}
