import React, { type Dispatch, type SetStateAction } from 'react';
import { Typography } from '@mui/material';
import CenteredBox from '../components/CenteredBox';
import Login from '../features/Login';

type LandingPageProps = {
    setcampaignId: Dispatch<SetStateAction<string | null>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setcampaignId }) => {
    return (
        <CenteredBox campaignId="">
            <Typography variant="h3" gutterBottom color="white">
                {'Welcome to TI4 Statistics!'}
            </Typography>
            <Login onLogin={setcampaignId} />
        </CenteredBox>
    );
};

export default LandingPage;
