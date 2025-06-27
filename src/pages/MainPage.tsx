import { Box } from '@mui/material';
import StrategyCard from '../components/StrategyCard';
import CenteredBox from '../components/CenteredBox';
import { useTheme } from '@mui/material/styles';
import TrophyTab from '../components/TrophyTab';

import React, { useEffect, useState } from 'react';
import AddGame from '../features/AddGame';
import AddPlayer from '../features/AddPlayer';
import { loadGames } from '../lib/storage';

type MainPageProps = {
    campaignId: string;
};

const MainPage: React.FC<MainPageProps> = ({ campaignId }) => {
    const theme = useTheme();
    const [boxContent, setBoxContent] = useState('Empty');
    const [currentWinner, setCurrentWinner] = useState<string>('');

    const setWinnerCallback = () => {
        loadGames(campaignId).then(loadedGames =>
            setCurrentWinner(
                loadedGames.sort(g => new Date(g.date).getTime())[
                    loadedGames.length - 1
                ].winnersName,
            ),
        );
    };

    useEffect(() => {
        setWinnerCallback();
    }, [boxContent]);

    return (
        <div
            style={{
                overflowY: 'scroll',
                width: '100%',
                height: '100%',
                padding: '30px 0px 30px 30px',
                scrollbarWidth: 'thin',
            }}
        >
            {/* <Container maxWidth="md"> */}
            <Box
                sx={{
                    display: 'flex',
                    // space
                }}
            >
                <CenteredBox campaignId={campaignId}>
                    <Box sx={{ marginTop: -5, marginRight: 85, marginLeft: '-105px' }}>
                        { }
                        <StrategyCard
                            number={1}
                            title="Add game"
                            color={theme.palette.custom.leader.main}
                            onClick={() => setBoxContent('AddGame')}
                        ></StrategyCard>
                        <StrategyCard
                            number={2}
                            title="Add game"
                            color={theme.palette.custom.diplomacy.main}
                            onClick={() => setBoxContent("AddPlayer")}
                        ></StrategyCard>
                        {/* <StrategyCard
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
                            ></StrategyCard> */}
                        {/* <StrategyCard
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
                    {boxContent === 'AddPlayer' ? (
                        <AddPlayer campaignId={campaignId} />
                    ) : (
                        <AddGame
                            campaignId={campaignId}
                            gameAddedCallback={setWinnerCallback}
                        />
                    )}
                </CenteredBox>
                <TrophyTab trophyHolderName={currentWinner} />
            </Box>
        </div>
    );
};

export default MainPage;
