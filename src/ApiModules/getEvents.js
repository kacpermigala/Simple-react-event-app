import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export default function getEvents(params = {}) {
  const url = URI(`${requestUrl}/events`);
  Object.keys(params).forEach(key => {
    url.addQuery(key, params[key]);
  });

  return fetch(url.toString(), {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res.data);
}
