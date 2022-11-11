import { EMPTY, INVALID_URL } from './constants';

function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('url').value.trim();
    const resultsEl = document.getElementById('results');
    // Check valid URL has been entered
    const result = Client.checkForURL(formText);
    const { isValid, reason } = result;
    let message = '';

    if (!isValid) {
        switch (reason) {
            case EMPTY:
                message = 'Input must not be empty.';
                break;
            case INVALID_URL:
                message = 'Please enter a valid URL.';
        }

        resultsEl.innerHTML = `<p class="error">${message}</p>`;
    } else {
        console.log('::: Form Submitted :::');

        resultsEl.textContent = 'Loading...';

        fetch('http://localhost:8081/analyze', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: formText,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not OK');
            }
            return res.json();
        })
        .then((data) => {
            const { score, sentence, subjectivity } = data;

            if (score && sentence && subjectivity) {
                resultsEl.innerHTML = `<ul>
                    <li>Score: ${score}</li>
                    <li>Sample sentence: ${sentence}</li>
                    <li>Subjectivity: ${subjectivity}</li>
                </ul>`;
            } else {
                throw new Error('Expected data attributes not found');
            }
        })
        .catch((error) => {
            console.error(error);
            resultsEl.innerHTML = '<p class="error">Encountered an unexpected technical error. Please try again later.</p>';
        });
    }
}

export { handleSubmit };
