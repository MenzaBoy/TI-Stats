import React from 'react';
import { Box, Typography } from '@mui/material';
import { getBaseUrl } from '../utils';

interface StrategyCardProps {
    number: number;
    title: string;
    color: string; // hex or MUI color
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const cardWidth = 80;

const StrategyCard: React.FC<StrategyCardProps> = ({
    number,
    title,
    color,
    onClick,
}) => {
    return (
        <Box
            component="div"
            onClick={onClick}
            sx={{
                width: cardWidth,
                height: 1.23 * cardWidth,
                background: color,
                color: 'white',
                borderTopLeftRadius: 11,
                clipPath:
                    'polygon(0% 0%, 90% 0%, 100% 12%, 100% 11%,57% 100%, 0% 100%, 0% 90%, 0% 10%)',
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // display: "inline-block",
                boxShadow: '30 30 30px rgba(255, 215, 0, 0.3)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                    transform: 'translateX(45px)',
                    cursor: 'pointer',
                },
            }}
        >
            <Box
                sx={{
                    width: cardWidth - 2,
                    height: 1.23 * cardWidth - 2,
                    backgroundImage: `url("${getBaseUrl()}/images/strategy-card-bg.webp")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    borderTopLeftRadius: 11,
                    clipPath:
                        'polygon(0% 0%, 90% 0%, 100% 12%, 100% 11%,57% 100%, 0% 100%, 0% 90%, 0% 10%)',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: "space-between",
                }}
            >
                {/* Header with number and title */}
                <Box
                    sx={{
                        // display: 'flex',
                        marginRight: '11px',
                        // flexDirection: 'row',
                        // justifyContent: "space-between",
                        // marginRight: "20px"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ marginLeft: '55px', marginTop: '-2px' }}
                    >
                        {number}
                    </Typography>
                    <Typography fontSize={12} sx={{ marginTop: '-2px' }}>
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default StrategyCard;
