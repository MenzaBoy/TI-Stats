import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { loadGames, loadPlayers, saveGame } from '../lib/storage';
import type { Game, Player, PlayerEntry } from 'types/models';
import { getGameId } from '../utils';
import PlayerFaction from '../components/PlayerFaction';

type GamesProps = {
    campaignId: string;
    availableFactions: string[];
    gameAddedCallback: () => void;
};

const Games: React.FC<GamesProps> = ({
    campaignId,
    availableFactions,
    gameAddedCallback,
}) => {
    const [loadedGames, setLoadedGames] = useState<Game[]>([]);
    const [loadedPlayers, setLoadedPlayers] = useState<Player[]>([]);

    const [date, setDate] = useState<string>('');
    const [winner, setWinner] = useState<string>('');
    const [playerNumber, setPlayerNumber] = useState<number>(3);
    const [entries, setEntries] = useState<PlayerEntry[]>([
        { player: '', faction: '' },
        { player: '', faction: '' },
        { player: '', faction: '' },
    ]);

    const updateEntry = (
        index: number,
        field: keyof PlayerEntry,
        value: string,
    ) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    useEffect(() => {
        loadGames(campaignId).then(games => setLoadedGames(games.sort(
            (g1, g2) =>
                new Date(g1.date).getTime() - new Date(g2.date).getTime(),
        )));
        loadPlayers(campaignId).then(players => setLoadedPlayers(players));
    }, [campaignId]);

    const handleAdd = async () => {
        setLoadedGames(await loadGames(campaignId));
        const gameId: string = getGameId({
            date,
            playedFactions: [],
            winnersName: winner,
        });
        if (loadedGames?.map(g => getGameId(g)).includes(gameId)) return;
        setDate('');
        setWinner('');
        setPlayerNumber(3);
        setEntries([
            { player: '', faction: '' },
            { player: '', faction: '' },
            { player: '', faction: '' },
        ]);

        const game: Game = {
            date,
            playedFactions: entries,
            winnersName: winner,
        };
        await saveGame(campaignId, game);

        loadGames(campaignId).then(games =>
            setLoadedGames(
                games.sort(
                    (g1, g2) =>
                        new Date(g1.date).getTime() -
                        new Date(g2.date).getTime(),
                ),
            ),
        );
        gameAddedCallback();
    };

    const handlePlayerNumber = (newPlayerNumber: number) => {
        setEntries(prev => {
            const diff = newPlayerNumber - prev.length;
            if (diff <= 0) return prev.slice(0, Math.max(3, newPlayerNumber));

            const newEntries = Array.from({ length: diff }, () => ({
                player: '',
                faction: '',
            }));
            return [...prev, ...newEntries];
        });
        setPlayerNumber(newPlayerNumber);
    };

    const areFormsFilled = () => {
        return date && winner && entries.every(e => e.player && e.faction);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
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
                <Autocomplete
                    options={loadedPlayers.map(player => player.name)}
                    value={winner}
                    onChange={(_, newValue) => setWinner(newValue || '')}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Winner"
                            variant="outlined"
                            size="small"
                        />
                    )}
                />
                <Autocomplete
                    options={['3', '4', '5', '6', '7', '8']}
                    value={playerNumber.toString()}
                    onChange={(_, newValue) =>
                        handlePlayerNumber(newValue ? parseInt(newValue) : 3)
                    }
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Number of players"
                            variant="outlined"
                            size="small"
                        />
                    )}
                />
                <Divider />
                <Box>
                    {Array.from({ length: playerNumber }).map((_, index) => (
                        <PlayerFaction
                            key={index}
                            playerOrder={(index + 1).toString()}
                            availablePlayers={loadedPlayers
                                .map(player => player.name)
                                .filter(
                                    name =>
                                        !entries
                                            .map(e => e.player)
                                            .includes(name),
                                )}
                            availableFactions={availableFactions.filter(
                                faction =>
                                    !entries
                                        .map(e => e.faction)
                                        .includes(faction),
                            )}
                            chosenPlayer={entries[index].player}
                            setPlayer={(value: string) =>
                                updateEntry(index, 'player', value)
                            }
                            chosenFaction={entries[index].faction}
                            setFaction={(value: string) =>
                                updateEntry(index, 'faction', value)
                            }
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!areFormsFilled()}
                >
                    Add Game
                </Button>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '5px'
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Games
                </Typography>
                {loadedGames.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No games added yet.
                    </Typography>
                ) : (
                    loadedGames.map((game, index) => (
                        <Typography key={index} variant="body1">
                            • {game.date}
                        </Typography>
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default Games;
