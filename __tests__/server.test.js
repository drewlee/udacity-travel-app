const server = require('../src/server/index');
const fetch = require('node-fetch');

describe('Express server', () => {
  afterAll(() => {
    server.close();
  });

  test('No output when no trips have been saved', async () => {
    const result = await fetch('http://localhost:8081/trips');
    const data = await result.json();

    expect(data).toStrictEqual({});
  });

  test('Can save data when using POST', async () => {
    const data = {
      city: 'Boise',
      countryOrState: 'Idaho',
    };

    await fetch('http://localhost:8081/save', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await fetch('http://localhost:8081/trips');
    const json = await result.json();

    expect(json).toStrictEqual({
      trip: data,
    });
  });
});
