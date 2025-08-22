import { Box } from '@mui/material';

interface CenteredBoxProps {
    orientation?: 'column' | 'row';
    children: React.ReactNode;
    sx?: object; // optional MUI styling prop
}

const CenteredBox: React.FC<CenteredBoxProps> = ({ orientation, children, sx }) => {
    return (
        <Box
            id="centered-box-wrapper"
            sx={{
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: 'rgba(37, 77, 110,0.8)',
                boxShadow: 'rgba(0,0,0,0.5) 0 0 5px ',
                color: 'white',
                overflow: 'hidden',
                paddingBottom: '15px',
                maxHeight: '700px',

                ...sx,
            }}
        >
            <div
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: orientation ?? 'row',
                    justifyContent: 'center',
                    padding: '5px',
                    width: '100%',

                }}>

                {children}
            </div>
        </Box >
    );
};

export default CenteredBox;
