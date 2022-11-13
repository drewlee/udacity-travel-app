import { dateHandler } from './dateHandler';
import {
  getMonthOptionsHtml,
  getDayOptionsHtml,
} from './selectRenderers';

export function handleYearSelect(event) {
  const { target } = event;
  const selectedYear = Number(target.value);
  const currentDate = new Date();
  const monthEl = document.getElementById('trip-attributes_depart-month');
  const dayEl = document.getElementById('trip-attributes_depart-day');

  dateHandler.activeYear = selectedYear;

  const minMonthIndex = selectedYear === currentDate.getFullYear()
    ? currentDate.getMonth()
    : 0;

  dateHandler.activeMonth = minMonthIndex;
  monthEl.innerHTML = getMonthOptionsHtml(dateHandler.activeMonth, minMonthIndex);

  const isCurrentYearAndMonth = dateHandler.activeYear === currentDate.getFullYear() &&
    dateHandler.activeMonth === currentDate.getMonth();
  const minDay = isCurrentYearAndMonth ? currentDate.getDate() : 1;
  const maxDay = dateHandler.getMaxDayForMonth();

  dateHandler.activeDay = minDay;
  dayEl.innerHTML = getDayOptionsHtml(dateHandler.activeDay, minDay, maxDay);
}

export function handleMonthSelect(event) {
  const { target } = event;
  const selectedMonthIndex = Number(target.value);
  const currentDate = new Date();
  const dayEl = document.getElementById('trip-attributes_depart-day');

  dateHandler.activeMonth = selectedMonthIndex;

  const isCurrentYearAndMonth = dateHandler.activeYear === currentDate.getFullYear() && selectedMonthIndex === currentDate.getMonth();
  const minDay = isCurrentYearAndMonth ? currentDate.getDate() : 1;
  const maxDay = dateHandler.getMaxDayForMonth();

  dateHandler.activeDay = minDay;
  dayEl.innerHTML = getDayOptionsHtml(dateHandler.activeDay, minDay, maxDay);
}

export function handleDaySelect(event) {
  const { target } = event;
  const selectedDay = Number(target.value);

  dateHandler.activeDay = selectedDay;
}
