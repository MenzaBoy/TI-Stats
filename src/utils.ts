import hash from 'object-hash';
import type { Game } from 'types/models';

export const getBaseUrl = () => {
  return import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL;
};

export const getGameId = (
  game: Game
) =>
  hash({
    date: game.date,
    players: Array.from(game.playedFactions.keys()).sort(),
    factions: Array.from(game.playedFactions.values()).sort(),
  });

export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
