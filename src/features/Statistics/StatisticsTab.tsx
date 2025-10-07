import { loadGames } from '@/lib/storage';
import type { Game, PlayerEntry } from '@/types/models';
import React, { useEffect, useState } from 'react';

type StatisticsTabProps = {
    campaignId: string;
};

const StatisticsTab: React.FC<StatisticsTabProps> = ({
    campaignId,
}: StatisticsTabProps) => {
    const [loadedGames, setLoadedGames] = useState<Game[]>([]);

    const getFactionsByPlays = (games: Game[]): PlayerEntry[] => {
        if (games.length === 0) return [];
        console.log(games);
        const factionCount: { [key: string]: number } = {};
        games.forEach(game => {
            game.playedFactions.forEach(entry => {
                if (factionCount[entry.faction]) {
                    factionCount[entry.faction]++;
                } else {
                    factionCount[entry.faction] = 1;
                }
            });
        });
        return Object.entries(factionCount)
            .map(([faction, count]) => ({
                player: faction,
                faction: '',
                plays: count,
            }))
            .sort((a, b) => b.plays! - a.plays!);
    };

    useEffect(() => {
        loadGames(campaignId).then(games =>
            setLoadedGames(
                games.sort(
                    (g1, g2) =>
                        new Date(g1.date).getTime() -
                        new Date(g2.date).getTime(),
                ),
            ),
        );
        // loadPlayers(campaignId).then(players => setLoadedPlayers(players));
    }, [campaignId]);

    return (
        <div>
            <h2>Statistics</h2>
            {getFactionsByPlays(loadedGames).map((entry, index) => (
                <p key={index}>
                    {entry.player}: {entry.plays} plays
                </p>
            ))}
        </div>
    );
};

export default StatisticsTab;
