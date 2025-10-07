import { Box } from '@mui/material';
import theme from '@/theme/theme';

interface CenteredBoxProps {
    orientation?: 'column' | 'row';
    children: React.ReactNode;
    sx?: object;
}

const CenteredBox: React.FC<CenteredBoxProps> = ({
    orientation,
    children,
    sx,
}) => {
    return (
        <Box
            id="centered-box-wrapper"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',

                width: '90%',
                maxWidth: '1200px',
                minWidth: 'min-content',

                backgroundColor: 'rgba(37, 77, 110,0.9)',
                boxShadow: 'rgba(0,0,0,0.8) 0 0 5px ',
                color: 'white',
                overflow: 'hidden',
                borderRadius: '20px',
                paddingBottom: '15px',

                [theme.breakpoints.down('md')]: {
                    maxHeight: '700px',
                    width: '80%',
                },
                ...sx,
            }}
        >
            <div
                id="centered-box-scrollable"
                style={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: orientation ?? 'row',
                    justifyContent: 'center',
                    padding: '5px',
                    width: '100%',
                }}
            >
                {children}
            </div>
        </Box>
    );
};

export default CenteredBox;
