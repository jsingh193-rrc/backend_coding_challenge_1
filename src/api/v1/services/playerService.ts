import { Player, players } from '../models/playerModel';

export function listPlayers(): { count: number; players: Player[] } {
  return { count: players.length, players };
}

export function findPlayerById(id: number): Player | undefined {
  return players.find(p => p.id === id);
}

export function gamesPlayed(player: Player): number {
  return player.wins + player.losses;
}

export function calculateRating(player: Player): number {
  const games = gamesPlayed(player);
  if (games === 0) return 0;
  const winRate = player.wins / games; // 0..1
  const base = winRate * 1000; // up to 1000 from win rate
  const scoreFactor = player.totalScore * 0.01; // scale score
  const rating = Math.max(0, Math.min(2000, base + scoreFactor)); // clamp 0..2000
  return Math.round(rating);
}

export function getRatingResponse(id: number): { id: number; name: string; rating: number; gamesPlayed: number } | undefined {
  const player = findPlayerById(id);
  if (!player) return undefined;
  return {
    id: player.id,
    name: player.name,
    rating: calculateRating(player),
    gamesPlayed: gamesPlayed(player),
  };
}
