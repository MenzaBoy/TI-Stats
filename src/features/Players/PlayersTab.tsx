import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { loadPlayers, savePlayer } from '@/lib/storage';
import type { Player } from '@/types/models';
import theme from '@/theme/theme';
import ListBox from '@/components/ListBox';

type PlayersTabProps = {
    campaignId: string;
};

const PlayersTab: React.FC<PlayersTabProps> = ({ campaignId }) => {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        loadPlayers(campaignId).then(loadedPlayers =>
            setPlayers(loadedPlayers),
        );
        console.log('Fetched players');
    }, [campaignId]);

    const handleAdd = async () => {
        setPlayers(await loadPlayers(campaignId));

        const trimmed = name.trim();
        const player: Player = { name: trimmed };
        if (!trimmed || players?.map(p => p.name).includes(trimmed)) return;

        await savePlayer(campaignId, player);
        setName('');
        loadPlayers(campaignId).then(loadedPlayers =>
            setPlayers(loadedPlayers),
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 4,
                padding: 2,
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                }}
            >
                <TextField
                    label="Player Name"
                    variant="outlined"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    size="small"
                    sx={{
                        minWidth: '200px',
                        width: '30%',
                        maxWidth: '500px',
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!name.trim()}
                >
                    Add Player
                </Button>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    minWidth: '150px',
                    overflowY: 'auto',
                    height: 'min-content',
                }}
            >
                <ListBox
                    title={'Players'}
                    listContent={players}
                    emptyContentText={'No players added yet.'}
                    itemKey="name"
                >
                    {/* {openGame && <GameDetail game={openGame} />} */}
                </ListBox>
            </Paper>
        </Box>
    );
};

export default PlayersTab;
