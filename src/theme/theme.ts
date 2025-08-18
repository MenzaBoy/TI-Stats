import type { PaletteColor, PaletteColorOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            [key: string]: PaletteColor;
        };
    }
    interface PaletteOptions {
        custom?: {
            [key: string]: PaletteColorOptions;
        };
    }
}

const theme = createTheme({
    typography: {
        fontFamily:
            '"TI Main Font", "TI Title Font", "Roboto", "Arial", sans-serif',
    },
    palette: {
        custom: {
            leader: {
                main: '#bd2932',
            },
            diplomacy: {
                main: '#d78d31',
            },
            politics: {
                main: '#eadd0b',
            },
            construction: {
                main: '#5e9e36',
            },
            trade: {
                main: '#1c9790',
            },
            warfare: {
                main: '#1378a4',
            },
            technology: {
                main: '#373a7b',
            },
            empire: {
                main: '#66376d',
            },
        },
    },
});

export default theme;
