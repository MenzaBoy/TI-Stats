import { Box } from '@mui/material';

interface CenteredBoxProps {
    campaignId: string;
    children: React.ReactNode;
    sx?: object; // optional MUI styling prop
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ campaignId, children, sx }) => {
    return (
        <Box
            sx={{
                // height: 'auto',
                maxHeight: '65vh',
                width: '65vw',
                '@media (max-width:1400px)': {
                    width: '50vh',
                },
                '@media (max-width:1000px)': {
                    width: '30vh',
                },
                '@media (max-width:800px)': {
                    width: campaignId ? 0 : '30vh',
                    padding: 0,
                },
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // alignItems: "center",
                backgroundColor: 'rgba(37, 77, 110,0.8)',
                // backgroundPosition: 'center',
                overflowY: 'auto', // scrolls when content overflows
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                color: 'white',
                padding: '50px',
                marginTop: '50px',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default CenteredBox;
