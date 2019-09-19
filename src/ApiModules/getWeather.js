import fetch from 'isomorphic-fetch';
import URI from 'urijs';

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export default function getWeather(location) {
  const url = URI(`${weatherApiUrl}/forecast/daily`);
  url.addQuery('q', location);

  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': weatherApiKey,
    },
  })
    .then(res => {
      res.json();
    })
    .then(res => res);
}
