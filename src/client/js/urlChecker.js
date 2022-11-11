import { EMPTY, INVALID_URL } from './constants';

const URL_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

function checkForURL(inputText) {
    console.log('::: Running checkForURL :::', inputText);

    const result = {
        isValid: true,
        reason: null,
    };

    if (inputText === '') {
        Object.assign(result, {
            isValid: false,
            reason: EMPTY,
        });
    } else if (!URL_REGEXP.test(inputText)) {
        Object.assign(result, {
            isValid: false,
            reason: INVALID_URL,
        });
    }

    return result;
}

export { checkForURL };
