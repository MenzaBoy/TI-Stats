import { Box } from '@mui/material';

interface CenteredBoxProps {
    children: React.ReactNode;
    sx?: object; // optional MUI styling prop
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ children, sx }) => {
    return (
        <Box
            sx={{
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'rgba(37, 77, 110,0.8)',
                boxShadow: 'rgba(0,0,0,0.5) 0 0 5px ',
                color: 'white',
                overflow: 'hidden',
                ...sx,
            }}
        >
            <div
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    // height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: '30px 30px 30px 30px',
                }}>

                {children}
            </div>
        </Box >
    );
};

export default CenteredBox;
