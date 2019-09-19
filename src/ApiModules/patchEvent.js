import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export default function patchEvent(id, date, location) {
  const url = URI(`${requestUrl}/events/${id}`);

  const body = `location=${location}&date=${date}`;

  return fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body,
  })
    .then(res => res.json())
    .then(res => res.data);
}
