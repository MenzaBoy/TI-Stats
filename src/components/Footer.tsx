import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <Box
            id="footer-box"
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            sx={{
                padding: '5px 0px 5px 0px',
                width: '100%',
                background:
                    'radial-gradient(ellipse at center,rgb(24, 24, 97), #000)',
                borderTop: '4px solid rgb(241,87,38)',
                borderBottom: '4px solid rgb(245,189,26)',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
            }}
        >
            {/* Optional space background overlay */}
            <Box />
            <Typography
                variant="h6"
                sx={{
                    // position: 'relative',
                    // zIndex: 1,
                    whiteSpace: 'nowrap',
                    fontFamily: 'TI Title Font',
                    '@media (max-width:700px)': {
                        fontSize: 'clamp(0.2rem, 2vw + 0.4rem, 5.7rem);',
                    },
                    '@media (max-width:500px)': {
                        backgroundSize: '1500px 100px',
                    },
                    '@media (max-width:400px)': {
                        backgroundSize: '1000px 100px',
                    },
                    '@media (max-width:330px)': {
                        fontSize: '0.9rem',
                    },
                    background:
                        'radial-gradient(ellipse at 50% 80%, rgb(247,190,23) 20%, rgb(253,242,147) 25%, rgb(238,90,29) 35%)',
                    backgroundSize: '2000px 100px',
                    backgroundPosition: 'center center',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                FOOTER
            </Typography>
        </Box>
    );
};

export default Footer;
