export const API = {
  GEONAMES: {
    HOSTNAME: 'api.geonames.org',
    PATH: 'postalCodeSearchJSON',
    TOKEN: 'drewlee',
  },
  WEATHERBIT: {
    HOSTNAME: 'api.weatherbit.io',
    PATH: 'v2.0/forecast/daily',
    TOKEN: 'd77ed2b81498472c877973651ad5f4ed',
  },
  PIXABAY: {
    HOSTNAME: 'pixabay.com',
    PATH: 'api',
    TOKEN: '31269148-aafc13797a42d74a85d0a65be',
  },
  LOCALHOST: {
    HOSTNAME: 'localhost:8081',
  }
};

export const ERRORS = {
  UNEXPECTED: 'Received an unexpected response from the resource',
  UNKNOWN: 'Encountered an unknow technical error'
};
