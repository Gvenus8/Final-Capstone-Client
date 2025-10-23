import { useState, useEffect } from 'react';
import { Box, Flex, Text, Heading } from '@radix-ui/themes';

export default function ReleaseCeremony({ entry, onComplete, onCancel }) {
    const [stage, setStage] = useState('fade-in');
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const timers = [];

        timers.push(setTimeout(() => setStage('showing'), 1000));

        timers.push(setTimeout(() => {
            setStage('burning');
            createParticles();
        }, 3000));

        
        timers.push(setTimeout(() => setStage('released'), 10000));

      
        timers.push(setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 13000));

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [onComplete]);

    const createParticles = () => {
        const newParticles = [];
       
        for (let i = 0; i < 80; i++) {
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
                background: 'rgba(0, 0, 0, 0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: stage === 'fade-in' ? 0 : 1,
                animation: stage === 'fade-in' ? 'fadeIn 5s ease-in' : 'none',
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
                        transform: scale(1);
                    }
                    30% {
                        filter: brightness(1.8) saturate(3) contrast(1.3);
                        transform: scale(1.05);
                    }
                    60% {
                        filter: brightness(1.2) saturate(2) hue-rotate(10deg);
                        transform: scale(0.98);
                    }
                    100% {
                        clip-path: inset(0 0 0 0);
                        filter: brightness(0.2) saturate(0.3) blur(2px);
                        transform: scale(0.95);
                    }
                }

                @keyframes particle {
                    0% {
                        transform: translateY(0) translateX(0) scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-50vh) translateX(var(--drift)) scale(1.5) rotate(180deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-120vh) translateX(calc(var(--drift) * 1.5)) scale(0) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes flicker {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    25% { opacity: 0.7; transform: scale(1.1); }
                    50% { opacity: 0.9; transform: scale(0.95); }
                    75% { opacity: 0.8; transform: scale(1.05); }
                }

                @keyframes ember {
                    0% {
                        transform: translateY(0) scale(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                        transform: translateY(-20px) scale(1);
                    }
                    100% {
                        transform: translateY(-150vh) scale(0.3);
                        opacity: 0;
                    }
                }

                .burning {
                    animation: burnUp 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .particle {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: radial-gradient(circle, #ff4500 0%, #ff6b35 30%, #f7931e 60%, transparent 100%);
                    border-radius: 50%;
                    animation: particle var(--duration) ease-out forwards;
                    animation-delay: var(--delay);
                    bottom: 0;
                    left: var(--left);
                    filter: blur(1px);
                    box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
                }

                .ember {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #ff8c00 0%, #ff4500 50%, transparent 100%);
                    border-radius: 50%;
                    animation: ember var(--duration) ease-in forwards;
                    animation-delay: var(--delay);
                    bottom: var(--bottom);
                    left: var(--left);
                    filter: blur(2px);
                }

                .fire-glow {
                    position: absolute;
                    bottom: -50px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120%;
                    height: 200px;
                    background: radial-gradient(ellipse at center, 
                        rgba(255, 69, 0, 0.8) 0%, 
                        rgba(255, 107, 53, 0.6) 30%,
                        rgba(247, 147, 30, 0.3) 50%,
                        transparent 80%);
                    animation: flicker 0.3s infinite;
                    filter: blur(20px);
                }

                .heat-wave {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        to top,
                        rgba(255, 69, 0, 0.1) 0%,
                        transparent 50%
                    );
                    animation: flicker 0.4s infinite;
                }
            `}</style>

            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{
                    position: 'relative',
                    maxWidth: '1600px',
                    width: '98%',
                    minHeight: '90vh',
                }}
            >
                {stage !== 'released' && (
                    <Box
                        className={stage === 'burning' ? 'burning' : ''}
                        style={{
                            backgroundImage: 'url(/images/notebook.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            padding: '8rem 7rem',
                            borderRadius: '12px',
                            boxShadow: stage === 'burning'
                                ? '0 20px 80px rgba(255, 69, 0, 0.6), 0 0 100px rgba(255, 107, 53, 0.4)'
                                : '0 10px 40px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: '80vh',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {stage === 'burning' && (
                            <>
                                <div className="fire-glow" />
                                <div className="heat-wave" />
                                {particles.map(particle => (
                                    <div
                                        key={particle.id}
                                        className="particle"
                                        style={{
                                            '--left': `${particle.left}%`,
                                            '--delay': `${particle.delay}s`,
                                            '--duration': `${particle.duration}s`,
                                            '--drift': `${(Math.random() - 0.5) * 100}px`,
                                        }}
                                    />
                                ))}
                               
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                        key={`ember-${i}`}
                                        className="ember"
                                        style={{
                                            '--left': `${Math.random() * 100}%`,
                                            '--bottom': `${Math.random() * 20}%`,
                                            '--delay': `${Math.random() * 2}s`,
                                            '--duration': `${3 + Math.random() * 3}s`,
                                        }}
                                    />
                                ))}
                            </>
                        )}

                        <Flex direction="column" gap="6" style={{ width: '100%', maxWidth: '1200px' }}>
                            <Heading
                                size="9"
                                style={{
                                    fontFamily: 'Nordic Chance',
                                    color: '#2c1810',
                                    textAlign: 'center',
                                    fontSize: '72px',
                                    textShadow: stage === 'burning' ? '0 0 20px rgba(255, 107, 53, 0.5)' : 'none',
                                }}
                            >
                                {entry.title}
                            </Heading>

                            <Text
                                size="6"
                                style={{
                                    fontFamily: 'Nordic Chance',
                                    color: '#2c1810',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '2',
                                    maxHeight: '50vh',
                                    overflow: 'auto',
                                    fontSize: '32px',
                                    padding: '2rem',
                                }}
                            >
                                {entry.content}
                            </Text>

                            <Text
                                size="4"
                                style={{
                                    fontFamily: 'Nordic Chance',
                                    color: 'rgba(44, 24, 16, 0.7)',
                                    textAlign: 'right',
                                    fontStyle: 'italic',
                                    marginTop: '2rem',
                                    fontSize: '28px',
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
                        gap="5"
                        style={{
                            animation: 'fadeIn 5s ease-in',
                        }}
                    >
                        <Text
                            size="8"
                            style={{
                                fontSize: '180px',
                                animation: 'fadeIn 25s ease-in',
                            }}
                        >
                            
                        </Text>
                        <Heading
                            size="9"
                            style={{
                                fontFamily: 'Nordic Chance',
                                color: '#f9f6f0',
                                textAlign: 'center',
                                fontSize: '96px',
                                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            Let Go...
                        </Heading>
                        <Text
                            size="6"
                            style={{
                                fontFamily: 'Nordic Chance',
                                color: 'rgba(249, 246, 240, 0.8)',
                                textAlign: 'center',
                                fontStyle: 'italic',
                                fontSize: '42px',
                            }}
                        >
                            Your words have been released
                        </Text>
                    </Flex>
                )}

                {stage === 'showing' && (
                    <Text
                        size="3"
                        style={{
                            fontFamily: 'Nordic Chance',
                            color: 'rgba(249, 246, 240, 0.6)',
                            textAlign: 'center',
                            marginTop: '2rem',
                            fontSize: '18px',
                        }}
                    >
                        Click anywhere to cancel
                    </Text>
                )}
            </Flex>
        </Box>
    );
}