import { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';

export default function ReleaseCeremony({ entry, onComplete, onCancel }) {
    const [stage, setStage] = useState('fade-in'); // fade-in -> showing -> burning -> released -> complete
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Animation sequence
        const timers = [];

        // Stage 1: Fade in (1s)
        timers.push(setTimeout(() => setStage('showing'), 1000));

        // Stage 2: Show entry for a moment (2s)
        timers.push(setTimeout(() => {
            setStage('burning');
            // Create fire particles
            createParticles();
        }, 3000));

        // Stage 3: Burning animation (3s)
        timers.push(setTimeout(() => setStage('released'), 6000));

        // Stage 4: Final message (2s)
        timers.push(setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 8000));

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [onComplete]);

    const createParticles = () => {
        const newParticles = [];
        for (let i = 0; i < 30; i++) {
            newParticles.push({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 2,
                duration: 2 + Math.random() * 2,
            });
        }
        setParticles(newParticles);
    };

    if (stage === 'complete') return null;

    return (
        <Box
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: stage === 'fade-in' ? 'fadeIn 1s ease-in' : 'none',
            }}
            onClick={stage === 'showing' ? onCancel : undefined}
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes burnUp {
                    0% {
                        clip-path: inset(100% 0 0 0);
                        filter: brightness(1);
                    }
                    50% {
                        filter: brightness(1.5) saturate(2);
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
                        filter: brightness(0.3) saturate(0.5);
                    }
                }

                @keyframes particle {
                    0% {
                        transform: translateY(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) scale(0);
                        opacity: 0;
                    }
                }

                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }

                .burning {
                    animation: burnUp 3s ease-in forwards;
                }

                .particle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: radial-gradient(circle, #ff6b35 0%, #f7931e 50%, transparent 100%);
                    border-radius: 50%;
                    animation: particle var(--duration) ease-out forwards;
                    animation-delay: var(--delay);
                    bottom: 0;
                    left: var(--left);
                    filter: blur(2px);
                }

                .fire-glow {
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 100px;
                    background: radial-gradient(ellipse at center, rgba(255, 107, 53, 0.6) 0%, transparent 70%);
                    animation: flicker 0.5s infinite;
                }
            `}</style>

            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{
                    position: 'relative',
                    maxWidth: '1400px',
                    width: '95%',
                }}
            >
                {stage !== 'released' && (
                    <Box
                        className={stage === 'burning' ? 'burning' : ''}
                        style={{
                            backgroundImage: 'url(/images/notebook.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            padding: '6rem 5rem',
                            borderRadius: '8px',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {stage === 'burning' && (
                            <>
                                <div className="fire-glow" />
                                {particles.map(particle => (
                                    <div
                                        key={particle.id}
                                        className="particle"
                                        style={{
                                            '--left': `${particle.left}%`,
                                            '--delay': `${particle.delay}s`,
                                            '--duration': `${particle.duration}s`,
                                        }}
                                    />
                                ))}
                            </>
                        )}

                        <Flex direction="column" gap="5">
                            <Heading
                                size="9"
                                style={{
                                    fontFamily: 'Caesar Dressing',
                                    color: '#2c1810',
                                    textAlign: 'center',
                                    fontSize: '48px',
                                }}
                            >
                                {entry.title}
                            </Heading>

                            <Text
                                size="6"
                                style={{
                                    fontFamily: 'Caesar Dressing',
                                    color: '#2c1810',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.8',
                                    maxHeight: '600px',
                                    overflow: 'auto',
                                    fontSize: '24px',
                                }}
                            >
                                {entry.content}
                            </Text>

                            <Text
                                size="4"
                                style={{
                                    fontFamily: 'Caesar Dressing',
                                    color: 'rgba(44, 24, 16, 0.7)',
                                    textAlign: 'right',
                                    fontStyle: 'italic',
                                    marginTop: '2rem',
                                    fontSize: '20px',
                                }}
                            >
                                To: {entry.recipient}
                            </Text>
                        </Flex>
                    </Box>
                )}

                {stage === 'released' && (
                    <Flex
                        direction="column"
                        align="center"
                        gap="4"
                        style={{
                            animation: 'fadeIn 4s ease-in',
                        }}
                    >
                        <Text
                            size="8"
                            style={{
                                fontSize: '120px',
                            }}
                        >
                            🎈
                        </Text>
                        <Heading
                            size="9"
                            style={{
                                fontFamily: 'Caesar Dressing',
                                color: '#f9f6f0',
                                textAlign: 'center',
                                fontSize: '64px',
                            }}
                        >
                            Let Go...
                        </Heading>
                        <Text
                            size="6"
                            style={{
                                fontFamily: 'Caesar Dressing',
                                color: 'rgba(249, 246, 240, 0.8)',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: '32px',
                            }}
                        >
                            Your words have been released
                        </Text>
                    </Flex>
                )}

                {stage === 'showing' && (
                    <Text
                        size="2"
                        style={{
                            fontFamily: 'Caesar Dressing',
                            color: 'rgba(249, 246, 240, 0.6)',
                            textAlign: 'center',
                            marginTop: '2rem',
                        }}
                    >
                        Click anywhere to cancel
                    </Text>
                )}
            </Flex>
        </Box>
    );
}