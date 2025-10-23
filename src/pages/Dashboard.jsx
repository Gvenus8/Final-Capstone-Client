import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Text, Flex, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showFrame, setShowFrame] = useState(true);

    
    const [affirmation] = useState(() => {
        const affirmations = [
            "Your feelings are valid and deserve space",
            "Healing is not linear, and that's okay",
            "Like Eir, you carry healing within you",
            "You are worthy of peace and rest",
            "Every word you write brings you closer to healing",
            "Your journey is your own,  and you're doing great",
            "The wounds of today make you stronger tomorrow",
            "Your story is worth telling",
            "Take your time, there is no rush to heal",
            "You are braver than you believe"
        ];
        return affirmations[Math.floor(Math.random() * affirmations.length)];
    });

    return (
        <>
           
            <AnimatePresence>
                {showFrame && (
                    <motion.div
                        initial={{ x: '-50vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100vw' }}
                        transition={{
                            duration: 1.2,
                            ease: 'easeInOut',
                            exit: { duration: 0.8 }
                        }}
                        onAnimationComplete={() => {
                            setTimeout(() => setShowFrame(false), 2000);
                        }}
                        style={{
                            position: 'fixed',
                            top: '10%',
                            left: '20%',
                            transform: 'translate(-50%, 0%)',
                            zIndex: 9999,
                            width: 'min(90vw, 1200px)',
                            height: 'min(90vh, 1200px)',
                            pointerEvents: 'none',
                        }}
                    >
                        <motion.img
                            src="/images/welani4.png"
                            alt="Welcome"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

          
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showFrame ? 0.3 : 1 }}
                transition={{ duration: 0.6 }}
            >
                <Container size="4">
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        style={{ 
                            minHeight: '90vh', 
                            width: '100%',
                            textAlign: 'center',
                            
                             
                             }}
                        gap="6"
                    >
                      
                        <Box
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '1264px',
                                marginTop: '-5rem',
                                marginBottom: '2rem',
                                
                            }}
                        >
                            
                            <img
                                src="/images/mountain4.png"
                                alt="Mountain Frame"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                                }}
                            />

                          
                            <Box
                                style={{
                                    position: 'absolute',
                                    top: '110%',
                                    left: '55%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    textAlign: 'center',
                                    padding: '3rem',
                                    marginTop: '1rem',
                                }}
                            >
                                <Text
                                    size="6"
                                    weight="bold"
                                    style={{
                                        fontFamily: "Nordic Chance",
                                        fontWeight: 250,
                                        fontStyle: "normal",
                                        fontSize: '45px',
                                        display: 'block',
                                        textShadow: '1px 2px 2px rgba(0,0,0,0.5)',
                                        letterSpacing: '2px',
                                        color: '#293d2bff',
                                        lineHeight: '1.4',
                                        backgroundImage: `url('/images/stroke2.png')`,
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        padding: '10px',
                                    }}
                                >
                                    "{affirmation}"
                                </Text>
                            </Box>
                        </Box>
                    </Flex>
                </Container>
            </motion.div>
        </>
    );
}