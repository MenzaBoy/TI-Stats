import React, { useState } from 'react';
import {
    Autocomplete,
    Collapse,
    TextField,
    Typography,
} from '@mui/material';
import type { Game } from '@/types/models';
import PlayerFaction from '@/components/PlayerFaction';

type GameDetailProps = {
    game: Game;
};

type Option = 'player-faction' | 'winner' | 'players' | null;

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
    const [openOption, setOpenOption] = useState<Option>(null);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div>
                <Typography variant="body1" gutterBottom>
                    {game.date}
                </Typography>
                <div
                    onClick={() =>
                        setOpenOption(
                            openOption === 'player-faction'
                                ? null
                                : 'player-faction',
                        )
                    }
                    style={{
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: '#1e668aff',
                        opacity: '0.5',
                        marginBottom: '8px',
                    }}
                >
                    <Typography>{'Players & Factions'}</Typography>
                    <Typography>
                        {openOption === 'player-faction' ? '-' : '+'}
                    </Typography>
                </div>
                <Collapse
                    id="player-faction-collapse"
                    in={openOption === 'player-faction'}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexShrink: 1,
                            marginTop: 8,
                        }}
                    >
                        {game.playedFactions.map((entry, index) => (
                            <PlayerFaction
                                key={index}
                                playerOrder={(index + 1).toString()}
                                availablePlayers={[entry.player]}
                                availableFactions={[entry.faction]}
                                chosenPlayer={entry.player}
                                setPlayer={() => { }}
                                chosenFaction={entry.faction}
                                setFaction={() => { }}
                                disabled={true}
                            />
                        ))}
                    </div>
                </Collapse>
            </div>
            <div>
                <div
                    onClick={() =>
                        setOpenOption(openOption === 'winner' ? null : 'winner')
                    }
                    style={{
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: '#1e668aff',
                        opacity: '0.5',
                        marginBottom: '8px',
                    }}
                >
                    <Typography>{'Winner'}</Typography>
                    <Typography>
                        {openOption === 'winner' ? '-' : '+'}
                    </Typography>
                </div>
                <Collapse id="winner-collapse" in={openOption === 'winner'}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexShrink: 1,
                            marginTop: 8,
                        }}
                    >
                        <Autocomplete
                            options={[]}
                            value={game.winnersName}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label={'Winner'}
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                            disabled={true}
                            sx={{ width: '100%' }}
                        />
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default GameDetail;
