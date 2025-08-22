import React, {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { loadCampaignInfo, saveCampaignInfo } from '../lib/storage';
import { hashPassword } from '../utils';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../lib/firebase';

type LoginProps = {
    onLogin: Dispatch<SetStateAction<string | null>>;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [campaignId, setcampaignId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const loginButtonRef = useRef<HTMLButtonElement>(null);

    const isLoginButtonDisabled = useCallback(() => {
        return !campaignId || !password || loading;
    }, [campaignId, password, loading]);

    useEffect(() => {
        const passwordEl = passwordRef.current;
        if (!passwordEl) return;

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !isLoginButtonDisabled()) {
                loginButtonRef.current?.click();
            }
        };

        passwordEl.addEventListener('keyup', handleKeyUp);
        return () => {
            passwordEl.removeEventListener('keyup', handleKeyUp);
        };
    }, [isLoginButtonDisabled]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const trimmedId = campaignId.trim();
            const trimmedPw = password.trim();

            if (trimmedId && trimmedPw) {
                const campaign = await loadCampaignInfo(trimmedId);
                const hashedPw = await hashPassword(trimmedPw);

                if (campaign === null) {
                    const shouldRegister = window.confirm(
                        'No campaign found. Do you want to register instead?',
                    );
                    if (shouldRegister) {
                        saveCampaignInfo({
                            id: trimmedId,
                            registrationDate: new Date().toISOString(),
                            passwordHash: hashedPw,
                        });
                        onLogin(campaignId);
                    }
                    return;
                }
                if (hashedPw !== campaign.passwordHash) {
                    console.log('INCORRECT PASSWORD'); // TODO, same pop-up window about incorrect creds, give option to register
                    return;
                }
                signInAnonymously(auth).then(() => {
                    localStorage.setItem('campaignId', campaignId);
                    onLogin(campaignId);
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                // minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{ padding: 4, width: 300, backgroundColor: '#1d1f40' }}
            >
                <Typography variant="h5" gutterBottom color="white">
                    TI4 Game Login
                </Typography>
                <TextField
                    label="Campaign ID"
                    value={campaignId}
                    onChange={e => setcampaignId(e.target.value)}
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'lightblue', // Label color
                        },
                    }}
                    slotProps={{
                        input: {
                            style: {
                                color: 'white',
                            },
                        },
                    }}
                />
                <TextField
                    id="passwordField"
                    label="Password"
                    type="password"
                    ref={passwordRef}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'lightblue', // Label color
                        },
                    }}
                    slotProps={{
                        input: {
                            style: {
                                color: 'white',
                            },
                        },
                    }}
                />
                <Button
                    id="loginButton"
                    variant="contained"
                    color="primary"
                    ref={loginButtonRef}
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoginButtonDisabled()}
                    sx={{ mt: 2 }}
                >
                    Enter Game
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;
