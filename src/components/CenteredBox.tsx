import { Box, Typography } from '@mui/material';

interface CenteredBoxProps {
    children: React.ReactNode;
    sx?: object; // optional MUI styling prop
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ children, sx }) => {
    return (
        <Box
            sx={{
                // height: 'auto',
                maxHeight: "65vh",
                width: '65vw',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: "center",
                // alignItems: "center",
                backgroundColor: 'rgba(37, 77, 110,0.8)',
                // backgroundPosition: 'center',
                overflowY: 'auto', // scrolls when content overflows
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                color: 'white',
                padding: '50px',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default CenteredBox;
