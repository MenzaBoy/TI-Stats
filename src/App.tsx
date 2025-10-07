import { useState } from 'react';
import '@/App.css';
import MainPage from '@/pages/MainPage';
import { getBaseUrl } from '@/utils';
import Banner from '@/components/Banner';
import LandingPage from '@/pages/LandingPage';
import Footer from '@/components/Footer';

function App() {
    const [campaignId, setCampaignId] = useState<string | null>(() => {
        return localStorage.getItem('campaignId');
    });

    return (
        <main
            style={{
                width: '100%',
                height: '100%',

                display: 'flex',
                flexDirection: 'column',

                backgroundImage: `url("${getBaseUrl()}images/ti4bg.webp")`,
                backgroundSize: 'cover',
                color: 'white',
                overflow: 'hidden',
            }}
        >
            <Banner />
            {campaignId === null ? (
                <LandingPage setCampaignId={setCampaignId} />
            ) : (
                <MainPage
                    campaignId={campaignId}
                    setCampaignId={setCampaignId}
                />
            )}
            <Footer />
        </main>
    );
}

export default App;
