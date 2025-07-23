import { Autocomplete, Box, TextField } from '@mui/material';
import type React from 'react';

interface PlayerFactionProps {
    availablePlayers: string[];
    availableFactions: string[];
    chosenPlayer: string;
    setPlayer: any;
    chosenFaction: string;
    setFaction: any;
}

const PlayerFaction: React.FC<PlayerFactionProps> = ({
    availablePlayers,
    availableFactions,
    chosenPlayer,
    setPlayer,
    chosenFaction,
    setFaction,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Autocomplete
                options={availablePlayers}
                value={chosenPlayer}
                onChange={(_, newValue) => setPlayer(newValue || '')}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Player"
                        variant="outlined"
                        size="small"
                    />
                )}
                sx={{ width: 200 }}
            />
            <Autocomplete
                options={availableFactions}
                value={chosenFaction}
                onChange={(_, newValue) => setFaction(newValue || '')}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Faction"
                        variant="outlined"
                        size="small"
                    />
                )}
                sx={{ width: 250 }}
                // slotProps={{
                //     listbox: {
                //         sx: {
                //             '& li': {
                //                 display: 'flex',
                //                 justifyContent: 'center', // centers horizontally
                //                 textAlign: 'center',       // ensures multiline text is centered
                //             },
                //         },
                //     },
                // }}
            />
        </Box>
    );
};

export default PlayerFaction;
