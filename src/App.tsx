import { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import { getBaseUrl } from './utils';
import Banner from './components/Banner';
import LandingPage from './pages/LandingPage';

function App() {
    const [campaignId, setCampaignId] = useState<string | null>(() => {
        return localStorage.getItem('campaignId');
    });

    return (
        <main
            style={{
                height: '100%',
                width: '100%',
                backgroundImage: `url("${getBaseUrl()}/images/ti4bg.jpg")`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // horizontally center content
                // justifyContent: 'flex-start', // or "center" for vertical centering
                // boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            <Banner />
            {campaignId === null ? (
                <LandingPage setCampaignId={setCampaignId} />
            ) : (
                <MainPage campaignId={campaignId} setCampaignId={setCampaignId} />
            )}
        </main>
    );
}

export default App;
