import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 6464;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _res, next) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  req.baseUrl_full = `${protocol}://${req.get('host')}`;
  next();
});

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.get('https://synnabotapi.azaken.com/status', {timeout: 5000});
    res.render('index', { status: data.status, baseUrl: req.baseUrl_full });
  } catch (err) {
    res.render('index', { status: 'Unavailable', baseUrl: req.baseUrl_full });
  }
});

app.get('/docs', (req, res) => {
  res.render('docs', { baseUrl: req.baseUrl_full });
});

app.get('/setup', (req, res) => {
  res.render('setup', { baseUrl: req.baseUrl_full });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
