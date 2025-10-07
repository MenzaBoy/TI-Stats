import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme.ts';
import { CampaignProvider } from './context/CampaignContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CampaignProvider>
                <App />
            </CampaignProvider>
        </ThemeProvider>
    </StrictMode>,
);
