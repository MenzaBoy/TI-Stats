import React, { type Dispatch, type SetStateAction } from 'react';
import { Typography } from '@mui/material';
import CenteredBox from '../components/CenteredBox';
import Login from '../features/Login';
import theme from '../theme/theme';

type LandingPageProps = {
    setCampaignId: Dispatch<SetStateAction<string | null>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setCampaignId }) => {
    return (
        <CenteredBox orientation='column' sx={{
            padding: '10px', marginTop: '15px', [theme.breakpoints.down("md")]: {
                width: '70%'

            },
        }}>
            <Typography variant="h4" gutterBottom color="white">
                {'Welcome to TI4 Statistics!'}
            </Typography>
            <Login onLogin={setCampaignId} />
        </CenteredBox >
    );
};

export default LandingPage;
