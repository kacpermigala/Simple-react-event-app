import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
// https://www.weatherbit.io
export default function getWeather(location) {
  const url = URI(`${weatherApiUrl}`);
  url.addQuery('city', location);
  url.addQuery('days', 14);
  url.addQuery('key', weatherApiKey);
  return fetch(url.toString(), {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res);
}
