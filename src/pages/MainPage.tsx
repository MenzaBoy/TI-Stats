import React, { useEffect, useState } from 'react';
import { GamesTab, PlayersTab, CalendarTab, TrophyTab } from '@/features';
import { Box, useMediaQuery } from '@mui/material';
import CenteredBox from '@/components/CenteredBox';

import { loadGames } from '@/lib/storage';
import type { FactionEntry, Game, PlayerEntry } from '@/types/models';
import StatisticsTab from '@/features/Statistics/StatisticsTab';

const FACTIONS: FactionEntry[] = [
    { factionName: 'The Arborec', factionImage: 'arborec.webp' },
    { factionName: 'The Barony of Letnev', factionImage: 'barony.webp' },
    { factionName: 'The Clan of Saar', factionImage: 'saar.webp' },
    { factionName: 'The Embers of Muaat', factionImage: 'muaat.webp' },
    { factionName: 'The Emirates of Hacan', factionImage: 'hacan.webp' },
    { factionName: 'The Federation of Sol', factionImage: 'sol.webp' },
    { factionName: 'The Ghosts of Creuss', factionImage: 'creuss.webp' },
    { factionName: 'The L1Z1X Mindnet', factionImage: 'l1z1x.webp' },
    { factionName: 'The Mentak Coalition', factionImage: 'mentak.webp' },
    { factionName: 'The Naalu Collective', factionImage: 'naalu.webp' },
    { factionName: 'The Nekro Virus', factionImage: 'nekro.webp' },
    { factionName: "Sardakk N'orr", factionImage: 'sardakk.webp' },
    { factionName: 'The Universities of Jol-Nar', factionImage: 'jolnar.webp' },
    { factionName: 'The Winnu', factionImage: 'winnu.webp' },
    { factionName: 'The Xxcha Kingdom', factionImage: 'xxcha.webp' },
    { factionName: 'The Yin Brotherhood', factionImage: 'yin.webp' },
    { factionName: 'The Yssaril Tribes', factionImage: 'yssaril.webp' },
    { factionName: 'The Argent Flight', factionImage: 'argent.webp' },
    { factionName: 'The Empyrean', factionImage: 'empyrean.webp' },
    { factionName: 'The Mahact Gene-Sorcerers', factionImage: 'mahact.webp' },
    { factionName: 'The Naaz-Rokha Alliance', factionImage: 'naazrokha.webp' },
    { factionName: 'The Nomad', factionImage: 'nomad.webp' },
    { factionName: 'The Titans of Ul', factionImage: 'titans.webp' },
    { factionName: "The Vuil'raith Cabal", factionImage: 'cabal.webp' },
];

type MainPageProps = {
    campaignId: string;
    currentTab: string;
};

const MainPage: React.FC<MainPageProps> = ({ campaignId, currentTab }) => {
    const [currentWinner, setCurrentWinner] = useState<PlayerEntry>();

    const isTrophyEnabled = useMediaQuery('(min-width:1060px)');

    const setWinnerCallback = () => {
        loadGames(campaignId).then(loadedGames => {
            const latestGame: Game = loadedGames.sort(
                (g1, g2) =>
                    new Date(g1.date).getTime() - new Date(g2.date).getTime(),
            )[loadedGames.length - 1];
            setCurrentWinner({
                player: latestGame.winnersName,
                faction:
                    latestGame.playedFactions.find(
                        f => f.player === latestGame.winnersName,
                    )?.faction || '',
            });
        });
    };

    useEffect(() => {
        setWinnerCallback();
    }, [currentTab]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            id="main-content-box"
            sx={{
                width: '100%',
                overflow: 'hidden',
                flex: 1,
                boxSizing: 'border-box',
                padding: '30px 15px 20px 15px',
                scrollbarWidth: 'thin',
                display: 'flex',
                gap: '10px',
            }}
        >
            <Box
                id="main-centered-box"
                sx={{
                    width: '100%',
                    // height: 'min-content',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {currentTab === 'Trophy' && (
                    <TrophyTab
                        trophyHolderName={currentWinner?.player || ''} // TODO: not an elegant solution
                        trophyHolderFaction={
                            FACTIONS.find(
                                faction =>
                                    faction.factionName ===
                                    currentWinner?.faction,
                            ) || ({} as FactionEntry)
                        }
                    />
                )}
                {currentTab !== 'Trophy' && (
                    <CenteredBox>
                        {currentTab === 'Players' && (
                            <PlayersTab campaignId={campaignId} />
                        )}
                        {currentTab === 'Games' && (
                            <GamesTab
                                campaignId={campaignId}
                                availableFactions={FACTIONS.map(
                                    faction => faction.factionName,
                                )}
                                gameAddedCallback={setWinnerCallback}
                            />
                        )}
                        {currentTab === 'Calendar' && (
                            <CalendarTab campaignId={campaignId} />
                        )}
                        {currentTab === 'Statistics' && (
                            <StatisticsTab campaignId={campaignId} />
                        )}
                    </CenteredBox>
                )}
            </Box>
            {currentTab !== 'Trophy' && isTrophyEnabled && (
                <Box
                    sx={{
                        width: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        touchAction: 'auto',
                    }}
                >
                    <TrophyTab
                        trophyHolderName={currentWinner?.player || ''} // TODO: not an elegant solution
                        trophyHolderFaction={
                            FACTIONS.find(
                                faction =>
                                    faction.factionName ===
                                    currentWinner?.faction,
                            ) || ({} as FactionEntry)
                        }
                    />
                </Box>
            )}
        </Box>
    );
};

export default MainPage;
