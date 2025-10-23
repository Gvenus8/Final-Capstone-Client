import { useState } from 'react';
import { Container, Heading, Text, Flex, Box, Button } from '@radix-ui/themes';

export default function Focus() {
    const [isActive, setIsActive] = useState(false);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };

    return (
        <Container size="4" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <style>{`
                @keyframes colorShift {
                    0%, 100% {
                        background-color: #6b8e23;
                    }
                    20% {
                        background-color: #2f4406ff;
                    }
                    40% {
                        background-color: #b8cc90ff;
                    }
                    60% {
                        background-color: #dbc3c5ff;
                    }
                    80% {
                        background-color: #907a7cff;
                    }
                }


                .background-shift {
                    animation: colorShift 15s ease-in-out infinite;
                }

               

                @keyframes breathe {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .breathe-active {
                    animation: breathe 4s ease-in-out infinite;
                    
                }
            `}</style>
            <img
                src="/images/focus.png"
                alt="Eir - Norse Goddess of Healing"
                width="600"
                height="600"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    paddingBottom: '2rem',
                }}
            />


            <Box
                style={{
                    background: '#374228',
                    borderRadius: '20px',

                    minHeight: '105vh',
                    width: '80%',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    border: '12px outset #b5c59f',
                    margin: '0 auto',
                }}
            >
                <Flex direction="column" align="center" gap="1">






                    <Box
                        className={isActive ? ' background-shift' : ''}
                        style={{
                            position: 'relative',
                            width: '700px',
                            height: '650px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '2rem 0',

                        }}
                    >

                        <img
                            src="/images/orb.png"
                            alt="Focus"
                            className={isActive ? ' breathe-active' : ''}
                            style={{
                                width: '60%',
                                height: '60%',
                                objectFit: 'contain',

                                transition: 'filter 0.3s ease',

                            }}
                        />


                        {isActive && (
                            <Box
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                }}
                            >
                                <Text
                                    size="9"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'Nordic Chance',
                                        color: '#b5c59f',
                                        textShadow: '3px 3px 12px rgba(0,0,0,0.9)',
                                        fontSize: '72px',
                                    }}
                                >
                                    Focus
                                </Text>
                            </Box>
                        )}
                    </Box>

                    <Box >
                        {!isActive ? (
                            <Button
                                size="4"
                                onClick={handleStart}
                                style={{
                                    fontFamily: 'Nordic Chance',
                                    background: '#b5c59f',
                                    color: '#4a5835',
                                    fontSize: '34px',
                                    padding: '1.5rem 2.5rem',
                                    border: '2px solid #8b953d',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    whiteSpace: 'nowrap',
                                    marginBottom: '2rem',
                                }}
                            >
                                Begin Focus
                            </Button>
                        ) : (
                            <Button
                                size="4"
                                onClick={handleStop}
                                style={{
                                    fontFamily: 'Caesar Dressing',
                                    background: '#b5c59f',
                                    color: 'white',
                                    fontSize: '18px',
                                    padding: '1.5rem 2.5rem',
                                    border: '2px solid #6d4770',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Stop
                            </Button>
                        )}
                    </Box>
                    <Box style={{
                        border: '5px solid #b5c59f',
                        width: '80%',
                        height: '300px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '0px',
                        boxSizing: 'border-box',
                        borderRadius: '15px',
                    }} >

                        <Text
                            size="3"
                            style={{
                                fontFamily: 'BlackChancery',
                                color: '#b5c59f',
                                textAlign: 'center',
                                maxWidth: '700px',
                                padding: '10px',
                                fontSize: '30px',
                            }}
                        >
                            Watch the colors shift and let your mind settle into deep focus.
                            Let distractions fade as you center yourself.
                        </Text>

                        <Flex
                            gap="4"
                            align="center"
                            style={{
                                maxWidth: '800px',
                                width: '100%',
                            }}
                        >

                            <Box
                                style={{

                                    flex: 1,

                                    marginTop: '30px',
                                    textAlign: 'center',
                                }}
                            >
                                <Text
                                    size="3"
                                    style={{
                                        fontFamily: 'blackChancery',
                                        color: '#b5c59f',
                                        lineHeight: '1.2',
                                        fontSize: '25px',
                                        padding: '0 10px',

                                    }}
                                >
                                    <strong>How it works:</strong><br />
                                    • Press "Begin Focus" to start<br />
                                    • Watch the colors gently shift<br />
                                    • Let your mind follow the flow<br />
                                    • Breathe naturally and center yourself<br />
                                    • Stay as long as you need
                                </Text>
                            </Box>


                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </Container>
    );
}