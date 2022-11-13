class DateHandler {
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  get activeYear() {
    return this._activeDate.getFullYear();
  }

  set activeYear(year) {
    this._activeDate.setFullYear(year);
  }

  get activeMonth() {
    return this._activeDate.getMonth();
  }

  set activeMonth(monthIndex) {
    this._activeDate.setMonth(monthIndex);
  }

  get activeDay() {
    return this._activeDate.getDate();
  }

  set activeDay(day) {
    return this._activeDate.setDate(day);
  }

  constructor() {
    this.reset();
  }

  getMaxDayForMonth() {
    const activeMonthIndex = this.activeMonth;
    const dateCopy = new Date(this._activeDate);
  
    for (let i = 32; i > 0; i--) {
      dateCopy.setDate(i);
  
      if (dateCopy.getMonth() === activeMonthIndex) {
        return i;
      }
  
      dateCopy.setMonth(activeMonthIndex);
    }
  }

  isWithinSixDays() {
    const departureDate = new Date(this.activeYear, this.activeMonth, this.activeDay);
    const time = departureDate.getTime();
    const sixDays = 6 * 24 * 60 * 60 * 1000;
    const sixDaysFromNow = Date.now() + sixDays;

    return time <= sixDaysFromNow;
  }

  getFormattedDatestamp() {
    const month = this.activeMonth + 1;
    const normalizedMonth = month < 10 ? `0${month}` : month.toString();
    const day = this.activeDay;
    const normalizedDay = day < 10 ? `0${day}` : day.toString();

    return `${this.activeYear}-${normalizedMonth}-${normalizedDay}`;
  }

  getFormattedDate() {
    const month = this.activeMonth + 1;
    const normalizedMonth = month < 10 ? `0${month}` : month.toString();
    const day = this.activeDay;
    const normalizedDay = day < 10 ? `0${day}` : day.toString();

    return `${normalizedMonth}/${normalizedDay}/${this.activeYear}`;
  }

  getDaysLeft() {
    const departureDate = new Date(this.activeYear, this.activeMonth, this.activeDay);
    const departureDateTime = departureDate.getTime();
    const now = Date.now();

    return Math.ceil((departureDateTime - now) / (24 * 60 * 60 * 1000));
  }

  reset() {
    this._activeDate = new Date();
  }
}

export const dateHandler = new DateHandler();
