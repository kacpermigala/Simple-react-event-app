import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const requestUrl = process.env.REACT_APP_BACKEND_URL;

export default function deleteEvent(id) {
  const url = URI(`${requestUrl}/events/${id}`);

  return fetch(url.toString(), {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => res.data);
}
