import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { loadGames, saveGame } from '../lib/storage';
import type { Game } from 'types/models';
import { getGameId } from '../utils';

type AddPlayerProps = {
    campaignId: string;
    gameAddedCallback: () => void;
};

const AddPlayer: React.FC<AddPlayerProps> = ({
    campaignId,
    gameAddedCallback,
}) => {
    const [date, setDate] = useState<string>('');
    const [winner, setWinner] = useState<string>('');
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        loadGames(campaignId).then(loadedGames => setGames(loadedGames));
        console.log('Fetched games');
    }, [campaignId]);

    const handleAdd = async () => {
        setGames(await loadGames(campaignId));
        const gameId: string = getGameId({ date, playedFactions: new Map<string, string>(), winnersName: winner });
        if (games?.map(g => getGameId(g)).includes(gameId)) return;

        const game: Game = {
            date,
            playedFactions: new Map(),
            winnersName: winner,
        };
        await saveGame(campaignId, game);
        setDate(date);
        loadGames(campaignId).then(loadedGames => {
            setGames(loadedGames);
            gameAddedCallback();
        });
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
                    label="Game Date"
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    size="small"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField
                    label="Winner"
                    type="text"
                    variant="outlined"
                    value={winner}
                    onChange={e => setWinner(e.target.value)}
                    size="small"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <Button variant="contained" onClick={handleAdd} disabled={!date}>
                    Add Game
                </Button>
            </Box>

            {/* Right: Game List */}
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    minWidth: '200px',
                    height: '200px',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Games
                </Typography>
                {games.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No games added yet.
                    </Typography>
                ) : (
                    games.map((game, index) => (
                        <Typography key={index} variant="body1">
                            • {game.date}
                        </Typography>
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default AddPlayer;
