import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import scrapeHandler from './scrape.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

app.post('/scrape', scrapeHandler);

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});