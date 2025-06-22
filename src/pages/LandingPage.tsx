import { Box } from '@mui/material';
import Banner from '../components/Banner';
import StrategyCard from '../components/StrategyCard';
import CenteredBox from '../components/CenteredBox';
import { useTheme } from '@mui/material/styles';
import TrophyTab from '../components/TrophyTab';
import { saveGame } from '../lib/storage';
import { useState } from 'react';



const LandingPage = () => {
    const theme = useTheme();
    const [gameId, setGameId] = useState('');

    const startGame = async () => {
        const newId = Math.random().toString(36).substring(2, 8); // simple ID
        await saveGame(newId, {
            players: [],
            createdAt: Date.now(),
        }).then(() => console.log("SAVED"));
        setGameId(newId);
        // window.location.href = `/game/${newId}`;
    };

    return (
        <main
            style={{
                height: '100%',
                width: '100%',
                backgroundImage: 'url("/images/ti4bg.jpg")',
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // horizontally center content
                justifyContent: 'flex-start', // or "center" for vertical centering
                boxSizing: 'border-box',
                overflow: "hidden"
            }}
        >
            <Banner />

            {/* <Container maxWidth="md"> */}
            <Box sx={{
                display: "flex",
                // space
            }}>

                <CenteredBox>
                    <Box sx={{ marginTop: -5, marginRight: 85, marginLeft: "-105px" }}>
                        { }
                        <StrategyCard
                            number={1}
                            title="Trophy"
                            color={theme.palette.custom.leader.main}
                        ></StrategyCard>
                        <StrategyCard
                            number={2}
                            title="Diplomacy"
                            color={theme.palette.custom.diplomacy.main}
                        ></StrategyCard>
                        <StrategyCard
                            number={3}
                            title="Politics"
                            color={theme.palette.custom.politics.main}
                        ></StrategyCard>
                        <StrategyCard
                            number={4}
                            title="Construction"
                            color={theme.palette.custom.construction.main}
                        ></StrategyCard>
                        <StrategyCard
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
                        ></StrategyCard>
                    </Box>

                    {/* <div className="p-6">
                        <h1 className="text-2xl mb-4">Twilight Imperium Score Tracker</h1>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={startGame}
                        >
                            Start New Game
                        </button>
                    </div> */}
                </CenteredBox>
                <TrophyTab></TrophyTab>
            </Box>

        </main >
    );
};

export default LandingPage;
