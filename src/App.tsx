import { useEffect, useState } from 'react';
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
    const [open, setOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState('Games');

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleTabChange = (newTab: string) => {
        setCurrentTab(newTab);
        const params = new URLSearchParams(window.location.search);
        params.set('currentTab', newTab);
        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${params}`,
        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tabFromUrl = params.get('currentTab');
        if (tabFromUrl) {
            setCurrentTab(tabFromUrl);
        }
    }, []);

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
            <Banner
                open={open}
                toggleDrawer={toggleDrawer}
                openTab={handleTabChange}
                setCampaignId={setCampaignId}
            />
            {campaignId === null ? (
                <LandingPage setCampaignId={setCampaignId} />
            ) : (
                <MainPage currentTab={currentTab} campaignId={campaignId} />
            )}
            <Footer />
        </main>
    );
}

export default App;
