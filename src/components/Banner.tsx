import { motion } from 'framer-motion';
import Menu from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CasinoIcon from '@mui/icons-material/Casino';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface BannerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => () => void;
    openTab: (tab: string) => void;
    setCampaignId: (id: string | null) => void;
}

const Banner: React.FC<BannerProps> = ({
    open,
    toggleDrawer,
    openTab,
    setCampaignId,
}) => {
    const logOut = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('campaignId');
            setCampaignId(null);
            signOut(auth);
        }
    };
    return (
        <Box
            id="banner-box"
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

                display: 'flex',
                alignItems: 'center',
                gap: 2,
                boxSizing: 'border-box',
            }}
        >
            {/* Optional space background overlay */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100px',
                    marginLeft: '10px',
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(true)}
                    edge="start"
                    sx={[open && { focus: 'none' }]}
                >
                    <Menu />
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                    >
                        <List>
                            <ListItem
                                key={'Trophy'}
                                disablePadding
                                onClick={() => {
                                    openTab('Trophy');
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EmojiEventsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Trophy'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {[
                                ['Games', <CasinoIcon />],
                                ['Players', <PeopleAltIcon />],
                                ['Calendar', <CalendarMonthIcon />],
                                ['Statistics', <AssessmentIcon />],
                            ].map(([text, icon]) => (
                                <ListItem
                                    key={text as string}
                                    disablePadding
                                    onClick={() => {
                                        openTab(text as string);
                                    }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            <ListItem
                                key={'Log Out'}
                                disablePadding
                                onClick={() => {
                                    logOut();
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Log Out'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </div>
            <Typography
                variant="h2"
                sx={{
                    // position: 'relative',
                    // zIndex: 1,
                    margin: '0 auto',
                    whiteSpace: 'nowrap',
                    fontFamily: 'TI Title Font',
                    '@media (max-width:800px)': {
                        fontSize: 'clamp(0.5rem, 5vw + 0.5rem, 5.7rem);',
                    },
                    '@media (max-width:500px)': {
                        backgroundSize: '1500px 100px',
                    },
                    '@media (max-width:400px)': {
                        backgroundSize: '1000px 100px',
                    },
                    '@media (max-width:330px)': {
                        fontSize: '1.5rem',
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
                TWILIGHT IMPERIUM STATS
            </Typography>
            <div
                style={{
                    width: '100px',
                    marginRight: '10px',
                }}
            ></div>
        </Box>
    );
};

export default Banner;
