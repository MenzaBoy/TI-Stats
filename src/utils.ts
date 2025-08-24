import type { CalendarEntry, Game } from 'types/models';
import hash from 'object-hash';

export const getBaseUrl = () => {
    return import.meta.env.MODE === 'development'
        ? ''
        : import.meta.env.BASE_URL;
};

export const getGameId = (game: Game) => {
    console.log(game);
    return hash({
        date: game.date,
        players: game.playedFactions.map(pf => pf.player).sort(),
        factions: game.playedFactions.map(pf => pf.faction).sort(),
    });
};

export async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export function hashCalendarEntry(entry: CalendarEntry) {
    return hash(entry);
}
