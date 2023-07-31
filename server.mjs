import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const app = express();
const port = 3000;
app.use(express.static('public'));
const apiKey = '47AD43A9865F42F345A24FDEE3313397';

app.get('/getRustStats/:steamID', async (req, res) => {
  try {
    const steamID = req.params.steamID;
    const steamProfileURL = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=${apiKey}&steamid=${steamID}`;
    const response = await fetch(steamProfileURL);

    if (!response.ok) {
      throw new Error('Помилка при отриманні статистики');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при отриманні статистики' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server start listening on port: ${port}`);
});
