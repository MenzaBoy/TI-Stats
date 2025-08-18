import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: PaletteColor;
    }

    interface PaletteOptions {
        custom?: PaletteColorOptions;
    }
}
