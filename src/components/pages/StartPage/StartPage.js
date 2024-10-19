import React, {useState} from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import LoginModal from '../../modals/LoginModal/LoginModal';

const StartPage = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State to control LoginModal visibility

    const handleLoginClick = () => {
        setLoginModalOpen(true);
      };
    
    const closeLoginModal = () => {
        setLoginModalOpen(false); // Close the login modal
    };

    return (
        <>
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '4rem' }}>
                <Box>
                    <Typography variant="h3" gutterBottom>
                    Welcome to Messenger!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" >
                    Start chatting now by logging in or registering for a new account.
                    </Typography>
                    <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                        style={{ marginRight: '1rem' }}
                    >
                        Log In / Register
                    </Button>
                    </Box>
                </Box>
            </Container>
            <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
        </>
    );
};
  
export default StartPage;