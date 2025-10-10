import React, { type Dispatch, type SetStateAction } from 'react';
import { Typography } from '@mui/material';
import CenteredBox from '@/components/CenteredBox';
import Login from '@/features/Login';
import theme from '@/theme/theme';

type LandingPageProps = {
    setCampaignId: Dispatch<SetStateAction<string | null>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setCampaignId }) => {
    return (
        <div
            style={{
                overflow: 'hidden',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%',
                scrollbarWidth: 'thin',
                display: 'flex',
                gap: '10px',
            }}
        >
            <CenteredBox
                orientation="column"
                sx={{
                    padding: '10px',
                    width: '60%',
                    [theme.breakpoints.down('md')]: {
                        width: '70%',
                    },
                }}
            >
                <Typography variant="h4" gutterBottom color="white">
                    {'Welcome to TI4 Statistics!'}
                </Typography>
                <Login onLogin={setCampaignId} />
            </CenteredBox>
        </div>
    );
};

export default LandingPage;
