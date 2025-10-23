import { useState, useEffect } from 'react';
import { Container, Heading, Text, Flex, Box, Button } from '@radix-ui/themes';

export default function BoxBreathing() {
    const [isActive, setIsActive] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);

    const phases = [
        { text: "Breathe In", duration: 5 },
        { text: "Hold", duration: 5 },
        { text: "Breathe Out", duration: 5 },
        { text: "Hold", duration: 5 }
    ];

    const cycleLength = 20;
    const cyclePosition = totalSeconds % cycleLength;

    let currentPhase = 0;
    let countdown = 5;

    if (cyclePosition < 5) {
        currentPhase = 0;
        countdown = 5 - cyclePosition;
    } else if (cyclePosition < 10) {
        currentPhase = 1;
        countdown = 10 - cyclePosition;
    } else if (cyclePosition < 15) {
        currentPhase = 2;
        countdown = 15 - cyclePosition;
    } else {
        currentPhase = 3;
        countdown = 20 - cyclePosition;
    }

    useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setTotalSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive]);

    const handleStart = () => {
        setIsActive(true);
        setTotalSeconds(0);
    };

    const handleStop = () => {
        setIsActive(false);
        setTotalSeconds(0);
    };

    return (
        <Container size="4" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <style>{`
                @keyframes pulse {
    /* Breathe In: 0-5 seconds (0-25%) - GROW */
    0% {
        transform: scale(1);
        opacity: 0.9;
    }
    25% {
        transform: scale(1.2);
        opacity: 1;
    }
    /* Hold: 5-10 seconds (25-50%) - STAY BIG */
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    /* Breathe Out: 10-15 seconds (50-75%) - SHRINK */
    75% {
        transform: scale(1);
        opacity: 0.9;
    }
    /* Hold: 15-20 seconds (75-100%) - STAY SMALL */
    100% {
        transform: scale(1);
        opacity: 0.9;
    }
}

.pulse-active {
    animation: pulse 20s ease-in-out infinite;
}
            `}</style>

            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="4"
            >
                <img
                    src="/images/db.png"
                    alt="Box Breathing"
                    width="600"
                    height="600"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />
                <Box
                    className={isActive ? 'pulse-active' : ''}
                    style={{
                        width: '400px',
                        height: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#374228',
                        borderRadius: '20px',
                        border: '3px solid rgba(249, 246, 240, 0.3)',
                        margin: '2rem 0',
                    }}
                >

                    <Text
                        size="8"
                        weight="bold"
                        style={{
                            fontFamily: 'BlackChancery',
                            color: '#b5c59f',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            marginBottom: '2rem',
                        }}
                    >
                        {isActive ? phases[currentPhase].text : 'Ready'}
                    </Text>


                    {isActive && (
                        <Text
                            size="9"
                            weight="bold"
                            style={{
                                fontFamily: 'Nordic Chance',
                                color: '#f9f6f0',
                                fontSize: '120px',
                                lineHeight: '1',
                            }}
                        >
                            {countdown}
                        </Text>
                    )}
                </Box>


                <Box style={{
                    width: '90%',
                    backgroundColor: '#374228',
                    border: '8px inset #b5c59f',
                    borderRadius: '5px',
                    padding: '1rem',
                    marginTop: '1rem',
                }}>


                    <Flex direction="column" align="center" gap="3">
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'BlackChancery',
                                color: '#b5c59f',
                                textAlign: 'center',
                                maxWidth: '800px',
                                fontSize: '25px',
                                marginTop: '40px',
                            }}
                        >
                            A calming technique used by warriors and healers alike.
                            Follow the rhythm as it guides your breath.
                        </Text>
                        <Box>
                            {!isActive ? (
                                <Button
                                    size="4"
                                    onClick={handleStart}
                                    style={{
                                        width: '360px',
                                        fontFamily: 'Nordic Chance',
                                        background: '#b5c59f',
                                        color: '#4a5835',
                                        fontSize: '34px',
                                        padding: '1.5rem 2.5rem',
                                        border: '2px solid #8b953d',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Begin Breathing
                                </Button>

                            ) : (

                                <Button
                                    size="4"
                                    onClick={handleStop}
                                    style={{
                                        fontFamily: 'Nordic Chance',
                                        background: '#b5c59f',
                                        color: 'white',
                                        fontSize: '34px',
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

                        <Flex
                            gap="3"
                            align="center"
                            style={{
                                maxWidth: '800px',
                                width: '50%',
                            }}
                        >

                            <Box
                                style={{
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    flex: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Text
                                    size="3"
                                    style={{
                                        fontFamily: 'BlackChancery',
                                        color: '#b5c59f',
                                        lineHeight: '1.2',
                                        fontSize: '25px',

                                    }}
                                >
                                    <strong>How it works:</strong><br />
                                    • Breathe in for 5 seconds<br />
                                    • Hold for 5 seconds<br />
                                    • Breathe out for 5 seconds<br />
                                    • Hold for 5 seconds<br />
                                    • Repeat as needed

                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
}