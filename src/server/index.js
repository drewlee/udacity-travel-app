const express = require('express');
const cors = require('cors');

const PORT = 8081;
const app = express();
let store = undefined;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.get('/trips', (req, res) => {
  const data = store ? { trip: store } : {};

  res.send(JSON.stringify(data));
});

app.post('/save', (req, res) => {
  const { body } = req;
  store = Object.assign({}, body);

  console.log('Successfully saved store:', store);

  res.send(JSON.stringify({ message: 'Successfully saved' }));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
