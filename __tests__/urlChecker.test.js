import { checkForURL } from '../src/client/js/urlChecker';
import { EMPTY, INVALID_URL } from '../src/client/js/constants';

describe('checkForURL', () => {
  test('Outputs error if no input is provided', () => {
    const result = checkForURL('');

    expect(result).toEqual({
      isValid: false,
      reason: EMPTY,
    });
  });

  test('Outputs error if provided invalid URL', () => {
    const result = checkForURL('foo bar baz');

    expect(result).toEqual({
      isValid: false,
      reason: INVALID_URL,
    });
  });

  test('Outputs `true` if provided valid URL', () => {
    const result = checkForURL('http://example.com');

    expect(result).toEqual({
      isValid: true,
      reason: null,
    });
  });
});
