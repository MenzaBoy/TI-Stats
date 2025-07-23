import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { loadPlayers, savePlayer } from '../lib/storage';
import type { Player } from 'types/models';

type PlayersProps = {
    campaignId: string;
};

const Players: React.FC<PlayersProps> = ({ campaignId }) => {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);
    // let players: string[] = []

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
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            {/* Left: Form */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '250px',
                }}
            >
                <TextField
                    label="Player Name"
                    variant="outlined"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!name.trim()}
                >
                    Add Player
                </Button>
            </Box>

            {/* Right: Player List */}
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    minWidth: '200px',
                    // height: '200px',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Players
                </Typography>
                {players.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No players added yet.
                    </Typography>
                ) : (
                    players.map((player, index) => (
                        <Typography key={index} variant="body1">
                            • {player.name}
                        </Typography>
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default Players;
