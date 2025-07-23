import React, { useEffect, useState } from 'react';
import Games from '../features/Games';
import Players from '../features/Players';
import Stats from '../features/Stats';
import { Box } from '@mui/material';
import CenteredBox from '../components/CenteredBox';
import StrategyCard from '../components/StrategyCard';
import TrophyTab from '../components/TrophyTab';

import { loadGames } from '../lib/storage';
import { useTheme } from '@mui/material/styles';
import type { FactionEntry, PlayerEntry } from 'types/models';

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
};

const MainPage: React.FC<MainPageProps> = ({ campaignId }) => {
    const theme = useTheme();
    const [boxContent, setBoxContent] = useState('Games');
    const [currentWinner, setCurrentWinner] = useState<PlayerEntry>();

    const setWinnerCallback = () => {
        loadGames(campaignId).then(loadedGames => {
            const latestGame = loadedGames.sort(
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
            console.log(
                loadedGames.sort(
                    (g1, g2) =>
                        new Date(g1.date).getTime() -
                        new Date(g2.date).getTime(),
                ),
            );
        });
    };

    useEffect(() => {
        setWinnerCallback();
    }, [boxContent]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                boxSizing: 'border-box',
                padding: '30px 0px 30px 30px',
                scrollbarWidth: 'thin',
                display: 'flex',
                // justifyContent: 'center',
            }}
            className="responsive-container"
        >
            {/* <Container maxWidth="md"> */}
            <Box
                sx={{
                    // marginTop: -5,
                    // marginRight: 85,
                    marginLeft: '-75px',
                    '@media (max-width:860px)': {
                        // marginTop: '100px',
                    },
                }}
            >
                <StrategyCard
                    number={1}
                    title="Players"
                    color={theme.palette.custom.leader.main}
                    onClick={() => setBoxContent('Players')}
                ></StrategyCard>
                <StrategyCard
                    number={2}
                    title="Games"
                    color={theme.palette.custom.diplomacy.main}
                    onClick={() => setBoxContent('Games')}
                ></StrategyCard>
                <StrategyCard
                    number={3}
                    title="Stats"
                    color={theme.palette.custom.politics.main}
                    onClick={() => setBoxContent('Stats')}
                ></StrategyCard>
                {/* <StrategyCard
                    number={4}
                    title="Construction"
                    color={theme.palette.custom.construction.main}
                ></StrategyCard> */}
                {/* <StrategyCard
                    number={5}
                    title="Trade"
                    color={theme.palette.custom.trade.main}
                ></StrategyCard>
                <StrategyCard
                    number={6}
                    title="Warfare"
                    color={theme.palette.custom.warfare.main}
                ></StrategyCard>
                <StrategyCard
                    number={7}
                    title="Technology"
                    color={theme.palette.custom.technology.main}
                ></StrategyCard>
                <StrategyCard
                    number={8}
                    title="Empire"
                    color={theme.palette.custom.empire.main}
                ></StrategyCard> */}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '30px',
                    '@media (max-width:920px)': {
                        flexDirection: 'column',
                        marginBottom: '100px',
                    },
                    overflowY: 'auto',
                }}
            >
                <CenteredBox>
                    {boxContent === 'Players' && (
                        <Players campaignId={campaignId} />
                    )}
                    {boxContent === 'Games' && (
                        <Games
                            campaignId={campaignId}
                            availableFactions={FACTIONS.map(
                                faction => faction.factionName,
                            )}
                            gameAddedCallback={setWinnerCallback}
                        />
                    )}
                    {boxContent === 'Stats' && <Stats />}
                </CenteredBox>
                <TrophyTab
                    trophyHolderName={currentWinner?.player || ''} // TODO: not an elegant solution
                    trophyHolderFaction={
                        FACTIONS.find(
                            faction =>
                                faction.factionName === currentWinner?.faction,
                        ) || ({} as FactionEntry)
                    }
                />
            </Box>
        </div>
    );
};

export default MainPage;
