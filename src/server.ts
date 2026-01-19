import express, { Request, Response } from 'express';
import cors from 'cors';
import pkg from '../package.json';
import { listPlayers, findPlayerById, getRatingResponse } from './api/v1/services/playerService';
import { getHealth } from './api/v1/services/healthService';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json(getHealth(pkg.version));
});

app.get('/api/v1/players', (req: Request, res: Response) => {
  res.json(listPlayers());
});

app.get('/api/v1/players/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const player = findPlayerById(id);
  if (!player) return res.status(404).json({ error: 'Player not found' });
  res.json(player);
});

app.get('/api/v1/players/:id/rating', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ratingResponse = getRatingResponse(id);
  if (!ratingResponse) return res.status(404).json({ error: 'Player not found' });
  res.json(ratingResponse);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
