import { dateHandler } from './dateHandler';

export function getYearOptionsHtml(activeYear, maxYear, minYear) {
  let html = '';

  for (let i = minYear; i <= maxYear; i++) {
    const isActive = i === activeYear ? ' selected': '';
    const option = `<option value="${i}"${isActive}>${i}</option>`;

    html = html.concat(option);
  }

  return html;
}

export function getMonthOptionsHtml(activeMonthIndex = 1, minMonthIndex = 0, maxMonthIndex = 11) {
  let html = '';

  for (let i = minMonthIndex; i <= maxMonthIndex; i++) {
    const isActive = i === activeMonthIndex ? ' selected' : '';
    const option = `<option value="${i}"${isActive}>${dateHandler.MONTH_NAMES[i]}</option>`;

    html = html.concat(option);
  }

  return html;
}

export function getDayOptionsHtml(activeDay = 1, minDay = 1, maxDay = 31) {
  let html = '';

  for (let i = minDay; i <= maxDay; i++) {
    const isActive = i === activeDay ? ' selected' : '';
    const option = `<option value="${i}"${isActive}>${i}</option>`;

    html = html.concat(option);
  }

  return html;
}
