import { Autocomplete, Box, TextField } from '@mui/material';
import type React from 'react';
import theme from '../theme/theme';

interface PlayerFactionProps {
    playerOrder: string;
    availablePlayers: string[];
    availableFactions: string[];
    chosenPlayer: string;
    setPlayer: any;
    chosenFaction: string;
    setFaction: any;
}

const PlayerFaction: React.FC<PlayerFactionProps> = ({
    playerOrder,
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
                marginBottom: '10px',
                width: '80vw',
                minWidth: '225px',
                maxWidth: '600px',
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                    width: '60vw',
                    gap: '8px',
                    padding: '3px',
                    border: '1px dashed #106a9aff',
                },
            }}
        >
            <Autocomplete
                options={availablePlayers}
                value={chosenPlayer}
                onChange={(_, newValue) => setPlayer(newValue || '')}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={'Player ' + playerOrder}
                        variant="outlined"
                        size="small"
                    />
                )}
                sx={{ width: '100%' }}
            />
            <Autocomplete
                options={availableFactions}
                value={chosenFaction}
                onChange={(_, newValue) => setFaction(newValue || '')}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={'Faction ' + playerOrder}
                        variant="outlined"
                        size="small"
                    />
                )}
                sx={{ width: '100%' }}
            />
        </Box>
    );
};

export default PlayerFaction;
