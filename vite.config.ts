import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
    return {
        base: command === 'serve' ? '/' : '/TI-Stats/',
        plugins: [react(), tsConfigPaths()],
    };
});
