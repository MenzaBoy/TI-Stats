import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import type { Game, Option } from '@/types/models';
import DropDownBox from '@/components/DropDownBox';
import PlayerFaction from '@/components/PlayerFaction';

type GameDetailProps = {
    game: Game;
};

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
    const [openOption, setOpenOption] = useState<Option>(null);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <DropDownBox
                title={'Players & Factions'}
                isOpen={openOption === 'player-faction'}
                optionName={'player-faction'}
                openCloseCallback={setOpenOption}
            >
                {game.playedFactions.map((entry, index) => (
                    <PlayerFaction
                        key={index}
                        playerOrder={(index + 1).toString()}
                        availablePlayers={[entry.player]}
                        availableFactions={[entry.faction]}
                        chosenPlayer={entry.player}
                        setPlayer={() => {}}
                        chosenFaction={entry.faction}
                        setFaction={() => {}}
                        disabled={true}
                    />
                ))}
            </DropDownBox>
            <DropDownBox
                title={'Winner'}
                isOpen={openOption === 'winner'}
                optionName={'winner'}
                openCloseCallback={setOpenOption}
            >
                {
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
                }
            </DropDownBox>
        </div>
    );
};

export default GameDetail;
