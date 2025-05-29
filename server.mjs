import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 6464;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (_req, res) => {
  try {
    const { data } = await axios.get('https://api.synnabot.azaken.com/status');
    res.render('index', { status: data.status });
  } catch (err) {
    res.render('index', { status: 'Unavailable' });
  }
});

app.get('/docs', (_req, res) => {
  res.render('docs');
});

app.get('/setup', (_req, res) => {
  res.render('setup');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
