import config from '../config.json';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.end(`Hello World!\n`);
});

app.listen(config.PORT, () => {
  console.log(`Basic app listening on port ${config.PORT}`);
});
