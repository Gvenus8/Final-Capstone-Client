import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Flex, Box, Text, Button, Separator, Card } from '@radix-ui/themes';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login');
    };

    return (
        <Box
            style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundImage: 'url(/images/eirback2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <Flex style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
                {/* Sidebar - Ancient Library */}
                <Flex
                    direction="column"
                    style={{
                        width: '300px',
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 10,
                    }}
                >
                    <style>{`
@keyframes runeGlow {
    0%, 100% {
        text-shadow: 0 0 5px rgba(255, 215, 120, 0.3);
    }
    50% {
        text-shadow: 0 0 15px rgba(255, 215, 120, 0.6), 0 0 25px rgba(255, 215, 120, 0.3);
    }
}

.ancient-book {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    transform-origin: left center;
    transform-style: preserve-3d;
    box-shadow:
        inset -3px 0 8px rgba(0,0,0,0.4),
        inset 3px 0 5px rgba(255,255,255,0.05),
        4px 4px 12px rgba(0,0,0,0.5),
        0 0 0 1px rgba(90, 61, 43, 0.3) !important;
    border-left: 4px solid rgba(30, 20, 10, 0.8) !important;
    overflow: visible !important;
}

.ancient-book::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 18px;
    background:
        repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.4) 0px,
            rgba(0,0,0,0.4) 1px,
            transparent 1px,
            transparent 3px,
            rgba(139, 90, 43, 0.3) 3px,
            rgba(139, 90, 43, 0.3) 4px,
            transparent 4px,
            transparent 8px
        ),
        linear-gradient(90deg,
            rgba(0,0,0,0.6) 0%,
            rgba(90, 61, 43, 0.4) 20%,
            rgba(139, 90, 43, 0.2) 40%,
            transparent 70%
        );
    border-radius: 15px 0 0 15px;
    z-index: 1;
}

.ancient-book::after {
    content: '';
    position: absolute;
    right: -1px;
    top: 0;
    bottom: 0;
    width: 6px;
    background:
        repeating-linear-gradient(
            0deg,
            rgba(255, 215, 120, 0.1) 0px,
            rgba(255, 215, 120, 0.1) 2px,
            transparent 2px,
            transparent 4px
        ),
        linear-gradient(90deg,
            transparent 0%,
            rgba(255, 215, 120, 0.15) 50%,
            rgba(139, 90, 43, 0.1) 100%);
    border-radius: 0 15px 15px 0;
}

.ancient-book:hover {
    transform: translateX(12px) rotateY(5deg) scale(1.02) !important;
    box-shadow:
        inset -4px 0 12px rgba(0,0,0,0.5),
        inset 4px 0 8px rgba(255,255,255,0.08),
        8px 8px 25px rgba(0,0,0,0.6),
        0 0 0 1px rgba(139, 90, 43, 0.5),
        0 0 20px rgba(255, 215, 120, 0.1) !important;
}

.ancient-book:hover::before {
    background:
        repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.5) 0px,
            rgba(0,0,0,0.5) 1px,
            transparent 1px,
            transparent 3px,
            rgba(255, 215, 120, 0.4) 3px,
            rgba(255, 215, 120, 0.4) 4px,
            transparent 4px,
            transparent 8px
        ),
        linear-gradient(90deg,
            rgba(0,0,0,0.7) 0%,
            rgba(139, 90, 43, 0.5) 20%,
            rgba(255, 215, 120, 0.3) 40%,
            transparent 70%
        );
}

.book-wellness {
    background: linear-gradient(to left,
        #7a2f00 0%, #7a2f00 4%, #aa950fff 5%, #7a2f00 7%, #aa950fff 8%,
        #7a2f00 9%, #aa950fff 11%, #7a2f00 12%, #aa950fff 13%, #7a2f00 14%,
        #7a2f00 70%, #aa950fff 71%, #505e3c 72%, #505e3c 90%,
        #aa950fff 91%, #7a2f00 92%, #D1d5cc 100%) !important;
}

.book-inscribe {
    background: linear-gradient(to left,
        #7a2f00 0%, #7a2f00 4%, #aa950fff 5%, #7a2f00 7%, #aa950fff 8%,
        #7a2f00 9%, #aa950fff 11%, #7a2f00 12%, #aa950fff 13%, #7a2f00 14%,
        #7a2f00 70%, #aa950fff 71%, #2a2f1d 72%, #2a2f1d 90%,
        #aa950fff 91%, #7a2f00 92%, #D1d5cc 100%) !important;
}

.book-chronicles {
    background: linear-gradient(to left,
        #7a2f00 0%, #7a2f00 4%, #aa950fff 5%, #7a2f00 7%, #aa950fff 8%,
        #7a2f00 9%, #aa950fff 11%, #7a2f00 12%, #aa950fff 13%, #7a2f00 14%,
        #7a2f00 70%, #aa950fff 71%, #858d32 72%, #858d32 90%,
        #aa950fff 91%, #7a2f00 92%, #D1d5cc 100%) !important;
}

.book-runes {
    background: linear-gradient(to left,
        #7a2f00 0%, #7a2f00 4%, #aa950fff 5%, #7a2f00 7%, #aa950fff 8%,
        #7a2f00 9%, #aa950fff 11%, #7a2f00 12%, #aa950fff 13%, #7a2f00 14%,
        #7a2f00 70%, #aa950fff 71%, #adb595 72%, #adb595 90%,
        #aa950fff 91%, #7a2f00 92%, #D1d5cc 100%) !important;
}

.book-wisdom {
    background: linear-gradient(to left,
        #7a2f00 0%, #7a2f00 4%, #aa950fff 5%, #7a2f00 7%, #aa950fff 8%,
        #7a2f00 9%, #aa950fff 11%, #7a2f00 12%, #aa950fff 13%, #7a2f00 14%,
        #7a2f00 70%, #aa950fff 71%, #d1d5cc 72%, #d1d5cc 90%,
        #aa950fff 91%, #7a2f00 92%, #D1d5cc 100%) !important;
}

.spine-rune {
    animation: runeGlow 3s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
    font-size: 22px;
}

.spine-title {
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5), 0 0 10px rgba(255, 215, 120, 0.2);
    letter-spacing: 1px;
    font-weight: 600;
}

.knotwork-decoration {
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 60%;
    background-image:
        radial-gradient(circle at 50% 20%, rgba(139, 90, 43, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 50% 40%, rgba(139, 90, 43, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(139, 90, 43, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 50% 80%, rgba(139, 90, 43, 0.4) 1px, transparent 1px);
    background-size: 14px 25%;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: 2;
}
`}</style>

                    {/* TOP SECTION - Transparent to show watercolor */}
                    <Box style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', background: 'transparent' }}>
                        <Box mb="3">
                            <img
                                src="/images/Eirlogo.png"
                                alt="Eir Logo"
                                style={{
                                    width: '250px',
                                    height: 'auto',
                                    marginBottom: '0.5rem',
                                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                                }}
                            />
                        </Box>
                        <Separator size="4" style={{ background: 'rgba(170, 149, 15, 0.4)' }} />
                    </Box>

                    {/* MIDDLE SECTION - Transparent to show watercolor */}
                    <Box
                        style={{
                            flex: 1,
                            background: 'transparent',
                            padding: '1rem 1.5rem',
                        }}
                    >
                        <Flex direction="column" gap="2" style={{ height: '100%' }}>
                            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                <Card
                                    className="ancient-book book-wellness"
                                    style={{
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '1.1rem 1rem',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <div className="knotwork-decoration"></div>
                                    <Flex align="center" gap="3">
                                        <Box
                                            className="spine-rune"
                                            style={{
                                                width: '38px',
                                                height: '48px',
                                                borderRadius: '20%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #aa950fff',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                marginLeft: '12px',
                                                color: '#aa950fff',
                                                fontSize: '22px',
                                            }}
                                        >
                                            ᚺ
                                        </Box>
                                        <Box style={{ flex: 1 }}>
                                            <Text className="spine-title" style={{
                                                color: '#aa950fff',
                                                fontFamily: "Caesar Dressing",
                                                fontSize: '20px',
                                                display: 'block',
                                                marginLeft: '12px',
                                            }}>
                                                DASHBOARD
                                            </Text>
                                            <Text style={{
                                                color: '#aa950fff',
                                                fontSize: '11px',
                                                fontFamily: "Caesar Dressing",
                                                marginLeft: '12px',
                                            }}>
                                                Hall of Wellness
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Link>

                            <Link to="/entries/new" style={{ textDecoration: 'none' }}>
                                <Card
                                    className="ancient-book book-inscribe"
                                    style={{
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '1.1rem 1rem',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <div className="knotwork-decoration"></div>
                                    <Flex align="center" gap="3">
                                        <Box
                                            className="spine-rune"
                                            style={{
                                                width: '38px',
                                                height: '48px',
                                                borderRadius: '20%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #aa950fff',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                marginLeft: '12px',
                                                color: '#aa950fff',
                                                fontSize: '22px',
                                            }}
                                        >
                                            ᚱ
                                        </Box>
                                        <Box style={{ flex: 1 }}>
                                            <Text className="spine-title" style={{
                                                color: '#aa950fff',
                                                fontFamily: "Caesar Dressing",
                                                fontSize: '20px',
                                                display: 'block',
                                                marginLeft: '12px',
                                            }}>
                                                NEW ENTRY
                                            </Text>
                                            <Text style={{
                                                color: '#aa950fff',
                                                fontSize: '11px',
                                                fontFamily: "Caesar Dressing",
                                                marginLeft: '12px',
                                            }}>
                                                Inscribe Your Tale
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Link>

                            <Link to="/entries" style={{ textDecoration: 'none' }}>
                                <Card
                                    className="ancient-book book-chronicles"
                                    style={{
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '1.1rem 1rem',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <div className="knotwork-decoration"></div>
                                    <Flex align="center" gap="3">
                                        <Box
                                            className="spine-rune"
                                            style={{
                                                width: '38px',
                                                height: '48px',
                                                borderRadius: '20%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #aa950fff',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                marginLeft: '12px',
                                                color: '#aa950fff',
                                                fontSize: '22px',
                                            }}
                                        >
                                            ᛊ
                                        </Box>
                                        <Box style={{ flex: 1 }}>
                                            <Text className="spine-title" style={{
                                                color: '#aa950fff',
                                                fontFamily: "Caesar Dressing",
                                                fontSize: '20px',
                                                display: 'block',
                                                marginLeft: '12px',
                                            }}>
                                                JOURNAL
                                            </Text>
                                            <Text style={{
                                                color: '#aa950fff',
                                                fontSize: '11px',
                                                fontFamily: "Caesar Dressing",
                                                marginLeft: '12px',
                                            }}>
                                                Sacred Chronicles
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Link>

                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <Card
                                    className="ancient-book book-runes"
                                    style={{
                                        border: 'none',
                                        borderRadius: '15px',
                                        padding: '1.1rem 1rem',
                                        cursor: 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    <div className="knotwork-decoration"></div>
                                    <Flex align="center" gap="3">
                                        <Box
                                            className="spine-rune"
                                            style={{
                                                width: '38px',
                                                height: '48px',
                                                borderRadius: '20%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid #aa950fff',
                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                marginLeft: '12px',
                                                color: '#aa950fff',
                                                fontSize: '22px',
                                            }}
                                        >
                                            ᛗ
                                        </Box>
                                        <Box style={{ flex: 1 }}>
                                            <Text className="spine-title" style={{
                                                color: '#aa950fff',
                                                fontFamily: "Caesar Dressing",
                                                fontSize: '20px',
                                                display: 'block',
                                                marginLeft: '12px',
                                            }}>
                                                PROFILE
                                            </Text>
                                            <Text style={{
                                                color: '#aa950fff',
                                                fontSize: '11px',
                                                fontFamily: "Caesar Dressing",
                                                marginLeft: '12px',
                                            }}>
                                                Your Runes
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Link>

                            {user?.isAdmin && (
                                <Link to="/admin" style={{ textDecoration: 'none' }}>
                                    <Card
                                        className="ancient-book book-wisdom"
                                        style={{
                                            border: 'none',
                                            borderRadius: '15px',
                                            padding: '1.1rem 1rem',
                                            cursor: 'pointer',
                                            position: 'relative',
                                        }}
                                    >
                                        <div className="knotwork-decoration"></div>
                                        <Flex align="center" gap="3">
                                            <Box
                                                className="spine-rune"
                                                style={{
                                                    width: '38px',
                                                    height: '48px',
                                                    borderRadius: '20%',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '2px solid #aa950fff',
                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                    marginLeft: '12px',
                                                    color: '#aa950fff',
                                                    fontSize: '22px',
                                                }}
                                            >
                                                ᚹ
                                            </Box>
                                            <Box style={{ flex: 1 }}>
                                                <Text className="spine-title" style={{
                                                    color: '#aa950fff',
                                                    fontFamily: "Caesar Dressing",
                                                    fontSize: '20px',
                                                    display: 'block',
                                                    marginLeft: '12px',
                                                }}>
                                                    ADMIN
                                                </Text>
                                                <Text style={{
                                                    color: '#aa950fff',
                                                    fontSize: '11px',
                                                    fontFamily: "Caesar Dressing",
                                                    marginLeft: '12px',
                                                }}>
                                                    Elder's Wisdom
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Link>
                            )}
                        </Flex>
                    </Box>

                    {/* BOTTOM SECTION - Transparent to show watercolor */}
                    <Box style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', background: 'transparent' }}>
                        <Separator size="4" style={{ background: 'rgba(170, 149, 15, 0.4)', marginBottom: '1rem' }} />

                        <Card
                            style={{
                                background: 'linear-gradient(135deg, #8b1e1e 0%, #b32424 50%, #d63031 100%)',
                                borderRadius: '15px',
                                padding: '1rem',
                                border: '2px solid rgba(139, 30, 30, 0.6)',
                                boxShadow: '0 8px 25px rgba(139, 30, 30, 0.4), inset 0 2px 4px rgba(0,0,0,0.3)',
                                marginBottom: '1rem',
                            }}
                        >
                            <Flex align="center" gap="3">
                                <Box
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#bac4a7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '20px',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                    }}
                                >
                                    ᚦ
                                </Box>
                                <Box>
                                    <Text size="3" weight="bold" style={{
                                        color: '#fffef0',
                                        fontFamily: "Caesar Dressing",
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                                    }}>
                                        EMERGENCY
                                    </Text>
                                    <Text size="1" style={{
                                        color: 'rgba(255,254,240,0.8)',
                                        fontFamily: "Caesar Dressing",
                                        fontSize: '11px',
                                    }}>
                                        Sacred Resources
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>

                        <Separator size="4" style={{ background: 'rgba(170, 149, 15, 0.4)', marginBottom: '1rem' }} />

                        <Box>
                            <Text size="2" style={{
                                color: 'rgba(186, 196, 167, 0.8)',
                                fontFamily: "Caesar Dressing",
                                fontSize: '13px',
                            }}>
                                Keeper of this Tome
                            </Text>
                            <Text size="3" weight="medium"
                                style={{
                                    display: 'block',
                                    marginTop: '0.25rem',
                                    fontFamily: "Caesar Dressing",
                                    fontSize: '16px',
                                    color: '#bac4a7',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                }}>
                                {user?.displayName || user?.email}
                            </Text>
                            <Button
                                variant="soft"
                                style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    fontFamily: "Caesar Dressing",
                                    fontSize: '15px',
                                    background: 'rgba(186, 196, 167, 0.2)',
                                    color: '#bac4a7',
                                    border: '1px solid rgba(186, 196, 167, 0.4)',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                                }}
                                onClick={handleLogout}
                            >
                                LOG OUT
                            </Button>
                        </Box>
                    </Box>
                </Flex>

                {/* Main Content */}
                <Box style={{
                    flex: 1,
                    padding: '2rem',
                    overflowY: 'auto',
                }}>
                    <Outlet />
                </Box>
            </Flex>
        </Box>
    );
}