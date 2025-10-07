import { loadGames } from '@/lib/storage';
import type { Game, Option, PlayerEntry } from '@/types/models';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DropDownBox from '@/components/DropDownBox';
import { getFactionColor } from '@/utils';

type StatisticsTabProps = {
    campaignId: string;
};

const StatisticsTab: React.FC<StatisticsTabProps> = ({
    campaignId,
}: StatisticsTabProps) => {
    const [loadedGames, setLoadedGames] = useState<Game[]>([]);
    const [openOption, setOpenOption] = useState<Option>(null);

    const getFactionsByPlays = (games: Game[]): PlayerEntry[] => {
        if (games.length === 0) return [];

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
                faction: faction,
                plays: count,
                player: '',
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                padding: 16,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Statistics
            </Typography>
            <DropDownBox
                title={'Faction Playtimes'}
                isOpen={openOption === 'factions-by-plays'}
                optionName={'factions-by-plays'}
                openCloseCallback={setOpenOption}
            >
                <div style={{ flex: 1 }}>
                    <BarChart
                        xAxis={[{ data: ['Factions'] }]}
                        series={getFactionsByPlays(loadedGames).map(e => ({
                            data: [e.plays],
                            label: e.faction,
                            color: getFactionColor(e.faction),
                        }))}
                        height={400}
                    />
                </div>
            </DropDownBox>
        </div>
    );
};

export default StatisticsTab;
