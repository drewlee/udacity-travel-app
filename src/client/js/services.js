import { API, ERRORS } from './constants';

const { GEONAMES, WEATHERBIT, PIXABAY, LOCALHOST } = API;
const { UNEXPECTED } = ERRORS;

export async function getCoordinatesForDestination(destination) {
  const { HOSTNAME, PATH, TOKEN } = GEONAMES;
  const url = encodeURI(`http://${HOSTNAME}/${PATH}?placename=${destination}&maxRows=10&username=${TOKEN}`);
  const response = await fetch(url);

  if (response && response.ok) {
    const data = await response.json();

    if (data && data.postalCodes && data.postalCodes.length) {
      const { lat, lng } = data.postalCodes[0];
      return { lat, lng };
    }
  }

  throw new Error(UNEXPECTED);
}

export async function getWeatherForCoordinates(lat, lon, datestamp) {
  const { HOSTNAME, PATH, TOKEN } = WEATHERBIT;
  const url = `https://${HOSTNAME}/${PATH}?lat=${lat}&lon=${lon}&units=I&key=${TOKEN}`;
  const response = await fetch(url);

  if (response && response.ok) {
    const json = await response.json();

    if (json && json.data && json.data.length) {
      const { data } = json;
      // Get results only for the departure date
      const result = data.filter((entry) => entry.datetime === datestamp);
      const { temp, weather: { description } } = result[0];

      return { temp, description };
    }
  }

  throw new Error(UNEXPECTED);
}

export async function getImageForDestination(destination) {
  const { HOSTNAME, PATH, TOKEN } = PIXABAY;
  const url = encodeURI(`https://${HOSTNAME}/${PATH}?q=${destination}&image_type=photo&orientation=horizontal&key=${TOKEN}`);
  const response = await fetch(url);

  if (response && response.ok) {
    const data = await response.json();

    if (data && data.hits && data.hits.length) {
      const { largeImageURL, webformatURL } = data.hits[0];
      return { largeImageURL, webformatURL };
    }
  }

  throw new Error(UNEXPECTED);
}

export async function postTripData(data) {
  const { HOSTNAME } = LOCALHOST;
  const response = await fetch(`http://${HOSTNAME}/save`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response || !response.ok) {
    throw new Error(UNEXPECTED);
  }
}

export async function fetchTripData() {
  const { HOSTNAME } = LOCALHOST;
  const response = await fetch(`http://${HOSTNAME}/trips`);

  if (response && response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error(UNEXPECTED);
}
