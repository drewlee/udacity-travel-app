import {
  getYearOptionsHtml,
  getMonthOptionsHtml,
  getDayOptionsHtml,
} from './selectRenderers';
import { dateHandler } from './dateHandler';
import { handleSubmit } from './formHandler';
import {
  handleYearSelect,
  handleMonthSelect,
  handleDaySelect,
} from './selectHandlers';
import { fetchTripData } from './services';
import { renderTripDetails } from './tripDetails';

class App {
  setupForm() {
    const { activeYear, activeMonth, activeDay } = dateHandler;

    // Limit the year select to 5 years out
    const maxYear = activeYear + 5;

    this.yearEl.innerHTML = getYearOptionsHtml(activeYear, maxYear, activeYear);
    this.monthEl.innerHTML = getMonthOptionsHtml(activeMonth, activeMonth);
    this.dayEl.innerHTML = getDayOptionsHtml(activeDay, activeDay, dateHandler.getMaxDayForMonth());

    this.cityEl.value = '';
    this.countryOrStateEl.value = '';
  }

  async getTripDetails() {
    // Render saved data if available
    try {
      const data = await fetchTripData();
      const { trip } = data;

      if (trip) {
        renderTripDetails(trip);
      }
    } catch (error) {
      console.error(error);
    }
  }

  initialize() {
    this.formEl = document.getElementById('trip-attributes');
    this.cityEl = document.getElementById('trip-attributes_dest-city');
    this.countryOrStateEl = document.getElementById('trip-attributes_dest-country-state');
    this.yearEl = document.getElementById('trip-attributes_depart-year');
    this.monthEl = document.getElementById('trip-attributes_depart-month');
    this.dayEl = document.getElementById('trip-attributes_depart-day');
    this.resultsEl = document.getElementById('results');

    this.setupForm();

    this.yearEl.addEventListener('change', handleYearSelect);
    this.monthEl.addEventListener('change', handleMonthSelect);
    this.dayEl.addEventListener('change', handleDaySelect);
    this.formEl.addEventListener('submit', handleSubmit);

    this.getTripDetails();
  }
}

export const app = new App();
