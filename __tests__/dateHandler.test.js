import { dateHandler } from '../src/client/js/dateHandler';

describe('dateHandler', () => {
  test('Is initially set to current date', () => {
    const date = new Date();

    expect(dateHandler.activeYear).toBe(date.getFullYear());
    expect(dateHandler.activeMonth).toBe(date.getMonth());
    expect(dateHandler.activeDay).toBe(date.getDate());
  });

  test('Gets the max day for a given month', () => {
    // Set the date to February 1st, 2022, which should only have 28 days
    dateHandler.activeDay = 1;
    dateHandler.activeMonth = 1;
    dateHandler.activeYear = 2022;

    expect(dateHandler.getMaxDayForMonth()).toBe(28);
  });

  test('Gets the formatted datestamp', () => {
    // Set the date to February 1st, 2022
    dateHandler.activeDay = 1;
    dateHandler.activeMonth = 1;
    dateHandler.activeYear = 2022;

    expect(dateHandler.getFormattedDatestamp()).toBe('2022-02-01');
  });

  test('Gets the formatted date', () => {
    // Set the date to February 1st, 2022
    dateHandler.activeDay = 1;
    dateHandler.activeMonth = 1;
    dateHandler.activeYear = 2022;

    expect(dateHandler.getFormattedDate()).toBe('02/01/2022');
  });
});
