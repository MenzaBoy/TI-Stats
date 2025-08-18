import React, { type Dispatch, type SetStateAction } from 'react';
import { Typography } from '@mui/material';
import CenteredBox from '../components/CenteredBox';
import Login from '../features/Login';

type LandingPageProps = {
    setCampaignId: Dispatch<SetStateAction<string | null>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setCampaignId }) => {
    return (
        <CenteredBox sx={{ flexDirection: 'column' }}>
            <Typography variant="h3" gutterBottom color="white">
                {'Welcome to TI4 Statistics!'}
            </Typography>
            <Login onLogin={setCampaignId} />
        </CenteredBox>
    );
};

export default LandingPage;
