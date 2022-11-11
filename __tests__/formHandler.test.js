import { handleSubmit } from '../src/client/js/formHandler';
import { EMPTY, INVALID_URL } from '../src/client/js/constants';

describe('handleSubmit', () => {
  window.Client = {
    checkForURL: jest.fn(),
  };

  window.fetch = jest.fn();

  const mockEvent = {
    preventDefault: jest.fn(),
  };
  let inputEl;
  let resultsEl;

  beforeEach(() => {
    const fixture = `<form novalidate>
      <input id="url" type="text" value="" placeholder="URL" required>
      <input type="submit" value="Submit">
    </form>
    <div id="results"></div>`;

    document.body.innerHTML = fixture;

    inputEl = document.getElementById('url');
    resultsEl = document.getElementById('results');
  });

  test('Displays error if URL was not entered', () => {
    window.Client.checkForURL.mockImplementation(() => {
      return {
        isValid: false,
        reason: EMPTY,
      };
    });

    handleSubmit(mockEvent);

    expect(resultsEl.innerHTML).toBe('<p class="error">Input must not be empty.</p>');
  });

  test('Displays error if entered invalid URL', () => {
    window.Client.checkForURL.mockImplementation(() => {
      return {
        isValid: false,
        reason: INVALID_URL,
      };
    });

    handleSubmit(mockEvent);

    expect(resultsEl.innerHTML).toBe('<p class="error">Please enter a valid URL.</p>');
  });

  test('Displays analysis info when entered a valid URL', () => {
    expect.assertions(1);

    const data = {
      score: 'positive',
      sentence: 'Lorem ipsum.',
      subjectivity: 'subjective'
    };

    window.Client.checkForURL.mockImplementation(() => {
      return {
        isValid: true,
        reason: null,
      };
    });

    window.fetch.mockImplementation(() => {
      return { then: () => {
        return {
          then: (cb) => {
            cb(data);
            return { catch: () => {} };
          },
        };
      }};
    });

    handleSubmit(mockEvent);

    expect(resultsEl.innerHTML).toBe(`<ul>
                    <li>Score: ${data.score}</li>
                    <li>Sample sentence: ${data.sentence}</li>
                    <li>Subjectivity: ${data.subjectivity}</li>
                </ul>`
    );
  });

  test('Displays error when network response fails', () => {
    expect.assertions(1);

    const data = {
      score: 'positive',
      sentence: 'Lorem ipsum.',
      subjectivity: 'subjective'
    };

    window.Client.checkForURL.mockImplementation(() => {
      return {
        isValid: true,
        reason: null,
      };
    });

    window.fetch.mockImplementation(() => {
      return { then: () => {
        return {
          then: () => {
            return { catch: (cb) => cb('Fake error') };
          },
        };
      }};
    });

    handleSubmit(mockEvent);

    expect(resultsEl.innerHTML).toBe('<p class="error">Encountered an unexpected technical error. Please try again later.</p>');
  });
});
