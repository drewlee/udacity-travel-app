require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const process = require('process');

const SCORE = {
    'P+': 'strong positive',
    P: 'positive',
    NEU: 'neutral',
    N: 'negative',
    'N+': 'strong negative',
    NONE: 'without polarity',
};
const PORT = 8081;
const BASE_DATA = Object.freeze({
    key: process.env.API_KEY,
    lang: 'en',
    model: 'general',
});
const ENDPOINT = 'https://api.meaningcloud.com/sentiment-2.1';
const app = express();

function encode(data) {
    return Object.keys(data)
        .map((key) => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');
}

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.post('/analyze', (req, res) => {
    const { url } = req.body;

    const data = {
        ...BASE_DATA,
        url,
    };

    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encode(data),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not OK');
        }
        return res.json();
    })
    .then((data) => {
        const { score_tag, subjectivity, sentence_list } = data;

        if (score_tag && subjectivity && sentence_list) {
            const randomIndex = Math.round(Math.random() * sentence_list.length);

            res.send({
                score: SCORE[score_tag],
                sentence: sentence_list[randomIndex].text,
                subjectivity: subjectivity.toLowerCase(),
            });
        } else {
            throw new Error('Expected data attributes not found');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500)
            .send({ message: 'Encountered an error fetching the request' });
    });
});

// Designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
