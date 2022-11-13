import { app } from './app';
import { dateHandler } from './dateHandler';
import {
  getCoordinatesForDestination,
  getWeatherForCoordinates,
  getImageForDestination,
  postTripData,
  fetchTripData,
} from './services';
import { ERRORS } from './constants';
import { renderTripDetails } from './tripDetails';

const { UNEXPECTED, UNKNOWN } = ERRORS;
const tryLaterMsg = 'Please try again later.';

export async function handleSubmit(event) {
  event.preventDefault();

  const city = app.cityEl.value.trim();
  const countryOrState = app.countryOrStateEl.value.trim();

  // Validate fields
  if (city === '' || countryOrState === '') {
    alert('Destination must be provided');
  } else {
    const destination = `${city},${countryOrState}`;
    let coordinates;

    // Get coordinates for the provided destination
    try {
      coordinates = await getCoordinatesForDestination(destination);
    } catch (error) {
      if (error.message === UNEXPECTED) {
        alert(`Error: ${UNEXPECTED}.\n${tryLaterMsg}`);
      } else {
        alert(`${UNKNOWN}.\n${tryLaterMsg}`);
      }

      console.error(error);
      return;
    }

    // Get forecast for the provided coordinates
    // Forecasts are only available 6 days out w/basic weatherbit plan
    const hasForecast = dateHandler.isWithinSixDays();
    let forecast = {
      temp: null,
      description: null,
    };

    if (hasForecast) {
      try {
        const { lat, lng } = coordinates;
        const datestamp = dateHandler.getFormattedDatestamp();
        forecast = await getWeatherForCoordinates(lat, lng, datestamp);
      } catch (error) {
        if (error.message === UNEXPECTED) {
          alert(`Error: ${UNEXPECTED}.\n${tryLaterMsg}`);
        } else {
          alert(`${UNKNOWN}.\n${tryLaterMsg}`);
        }

        console.error(error);
        return;
      }
    }

    let imgURLs;

    try {
      imgURLs = await getImageForDestination(destination);
    } catch (error) {
      if (error.message === UNEXPECTED) {
        alert(`Error: ${UNEXPECTED}.\n${tryLaterMsg}`);
      } else {
        alert(`${UNKNOWN}.\n${tryLaterMsg}`);
      }

      console.error(error);
      return;
    }

    const { temp, description } = forecast;
    const { largeImageURL, webformatURL } = imgURLs;
    const data = {
      city,
      countryOrState,
      temp,
      description,
      largeImageURL,
      webformatURL,
      date: dateHandler.getFormattedDate(),
      daysLeft: dateHandler.getDaysLeft(),
    };

    // Post and save data to local backend
    try {
      await postTripData(data);
    } catch (error) {
      if (error.message === UNEXPECTED) {
        alert(`Error: ${UNEXPECTED}.\n${tryLaterMsg}`);
      } else {
        alert(`${UNKNOWN}.\n${tryLaterMsg}`);
      }

      console.error(error);
      return;
    }

    // Reset the form
    dateHandler.reset();
    app.setupForm();

    // Get the data from backend and render trip details
    try {
      const data = await fetchTripData();
      const { trip } = data;

      if (trip) {
        renderTripDetails(trip);
      }
    } catch (error) {
      if (error.message === UNEXPECTED) {
        alert(`Error: ${UNEXPECTED}.\n${tryLaterMsg}`);
      } else {
        alert(`${UNKNOWN}.\n${tryLaterMsg}`);
      }

      console.error(error);
    }
  }
}
