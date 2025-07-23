import { Box } from '@mui/material';

interface CenteredBoxProps {
    campaignId: string;
    children: React.ReactNode;
    sx?: object; // optional MUI styling prop
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ children, sx }) => {
    return (
        <Box
            sx={{
                width: '50vw',
                minWidth: '385px',
                minHeight: '640px',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                // alignItems: "center",
                backgroundColor: 'rgba(37, 77, 110,0.8)',
                // backgroundPosition: 'center',
                overflowY: 'auto', // scrolls when content overflows
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                color: 'white',
                padding: '30px',
                '@media (min-width:1100px)': {
                    width: '60vw',
                },
                '@media (min-width:1300px)': {
                    width: '65vw',
                },
                '@media (min-width:1500px)': {
                    width: '70vw',
                },
                '@media (min-width:1800px)': {
                    width: '75vw',
                },
                '@media (min-width:2200px)': {
                    width: '80vw',
                },
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default CenteredBox;
