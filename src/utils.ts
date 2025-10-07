import type { CalendarEntry, Game } from '@/types/models';
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

export function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // map hash value to 0–360 (hue)
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 30%)`; // Saturation 70%, Lightness 50%
}

export function getFactionColor(factionName: string): string {
    console.log(factionName);
    switch (factionName) {
        case 'The Emirates of Hacan':
            return '#ffb31f'; // Orange (70%), Yellow (30%)
        case 'The Federation of Sol':
            return '#66a6e6'; // Blue (60%), Yellow (40%)
        case 'The Barony of Letnev':
            return '#cc0000'; // Red (80%), Black (20%)
        case "Sardakk N'orr":
            return '#3a3a3a'; // Black (70%), Red (30%)
        case 'The Universities of Jol-Nar':
            return '#8040bf'; // Blue (50%), Purple (50%)
        case 'The Yssaril Tribes':
            return '#a3b33d'; // Green/Yellow (65%), Red (25%), Black (10%)
        case 'The Nekro Virus':
            return '#ff0000'; // Red (100%)
        case 'The Naalu Collective':
            return '#006400'; // Green (100%)
        case 'The Mentak Coalition':
            return '#804000'; // Orange (50%), Black (50%)
        case 'The Xxcha Kingdom':
            return '#409a80'; // Green (50%), Blue (50%)
        case 'The Ghosts of Creuss':
            return '#0a0a90'; // Blue (100%)
        case 'The Arborec':
            return '#2ab86a'; // Green (90%), Blue (10%)
        case 'The Clan of Saar':
            return '#a9b837'; // Green (50%), Yellow (25%), Orange (25%)
        case 'The Yin Brotherhood':
            return '#a31fd9'; // Purple (90%), Yellow (10%)
        case 'The Argent Flight':
            return '#cc7722'; // Orange (100%)
        case 'The Empyrean':
            return '#800080'; // Purple (100%)
        case 'The Mahact Gene-Sorcerers':
            return '#ffff29'; // Yellow (100%)
        case 'The Naaz-Rokha Alliance':
            return '#006400'; // Green (100%)
        case 'The Nomad':
            return '#8040bf'; // Green (50%), Blue (50%)
        case 'The Titans of Ul':
            return '#ff00ff'; // Pink (100%)
        case "The Vuil'raith Cabal":
            return '#800000'; // Red (50%), Black (50%)
        case 'The Embers of Muaat':
            return '#ff4c00'; // Red (50%) , Orange (50%)
        case 'The Winnu':
            return '#ffcb26'; // Orange (60%), Yellow (40%)
        case 'The L1Z1X Mindnet':
            return '#3366cc'; // Black (20%), Blue (60%)
        default:
            return 'black'; // Fallback to string-based color
    }
}
