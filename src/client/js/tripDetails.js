import { app } from './app';

export function renderTripDetails(data) {
  const { webformatURL, city, countryOrState, date, temp, description, daysLeft } = data;
  const forecast = temp && description
    ? `${temp} - ${description}`
    : 'Too far into the future to determine. Please check back later.'
  const countdown = daysLeft > 1
    ? `${daysLeft} days away.`
    : daysLeft < 1
      ? 'today!'
      : `${daysLeft} day away.`;

  const html = `<img src="${webformatURL}" />
    <div class="container">
      <h2>Destination: ${city}, ${countryOrState}</h2>
      <h2>Departing: ${date}</h2>
      <p>Forecast: ${forecast}</p>
      <p>Your trip is ${countdown}</p>
    </div>`;
  app.resultsEl.innerHTML = html;
}
