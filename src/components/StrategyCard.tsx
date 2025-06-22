import React from 'react';
import { Box, Typography } from '@mui/material';

interface StrategyCardProps {
    number: number;
    title: string;
    color: string; // hex or MUI color
}

const cardWidth = 80;

const StrategyCard: React.FC<StrategyCardProps> = ({ number, title, color }) => {
    return (
        <Box
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
                transition: 'transform 0.5s ease',
                '&:hover': {
                    transform: 'translateX(55px)',
                },

            }}
        >
            <Box
                sx={{
                    width: cardWidth - 2,
                    height: 1.23 * cardWidth - 2,
                    backgroundImage: 'url("/images/strategy-card-bg.png")',
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
                    <Typography variant="h5" sx={{ marginLeft: "55px", marginTop: "-2px" }}>
                        {number}
                    </Typography>
                    <Typography fontSize={12} sx={{ marginTop: "-2px" }}>
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default StrategyCard;
