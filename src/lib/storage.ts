// src/lib/db.ts
import type { CampaignInfo, Game, Player } from 'types/models';
import { db } from './firebase';
import { get, ref, set } from 'firebase/database';
import { getGameId } from '../utils';

export async function savePlayer(campaignId: string, player: Player) {
    await set(
        ref(db, `campaigns/${campaignId}/players/${player.name}`),
        player,
    );
}

export async function loadPlayers(campaignId: string): Promise<Player[] | []> {
    const playersDict = await getDataFromDb(
        `campaigns/${campaignId}/players`,
        [],
    );
    return playersDict ? Object.values(playersDict) : [];
}

export async function saveGame(campaignId: string, game: Game) {
    await set(
        ref(db, `campaigns/${campaignId}/games/${getGameId(game)}`),
        game,
    );
}

export async function loadGames(campaignId: string): Promise<Game[] | []> {
    const gamesDict = await getDataFromDb(`campaigns/${campaignId}/games`, []);
    return gamesDict ? Object.values(gamesDict) : [];
}

export async function saveCampaignInfo(campaign: CampaignInfo) {
    await set(ref(db, `campaignInfos/${campaign.id}`), campaign);
}

export async function loadCampaignInfo(
    campaignId: string,
): Promise<CampaignInfo | null> {
    return await getDataFromDb(`campaignInfos/${campaignId}`, null);
}

async function getDataFromDb(
    path: string,
    defaultReturnValue: any,
): Promise<any> {
    const snapshot = await get(ref(db, path)); //TODO return values
    return snapshot.exists() ? snapshot.val() : defaultReturnValue;
}
