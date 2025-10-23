import { Link, Outlet, useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Flex, Box, Text, Button, Separator, Card } from '@radix-ui/themes';
import { useEffect } from 'react';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (!user) return;

        console.log("Setting up Spotify refresh interval");

        const refreshSpotifyPlayer = () => {
            const spotifyIframe = document.querySelector('iframe[src*="spotify.com"]');
            if (spotifyIframe) {
               
                const originalSrc = spotifyIframe.src;
                spotifyIframe.src = 'about:blank';


                setTimeout(() => {
                    spotifyIframe.src = originalSrc;
                    console.log("Spotify player refreshed");
                }, 100);
            }
        };

        const refreshInterval = setInterval(refreshSpotifyPlayer, 45 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
            console.log("Spotify refresh interval cleared");
        };
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login');
    };
    const handleEmergency = () => {
        window.open('https://www.google.com/maps/search/emergency/@36.1641922,-86.7897662,13.42z?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D', '_blank');
    };

    const bookGradients = {
        wellness: 'linear-gradient(to left, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #6f8550 6%,  #6f8550 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #6f8550 82%, #6f8550 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        wellness2: 'linear-gradient(to left, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #5d6f43 6%,  #5d6f43 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #5d6f43 82%, #5d6f43 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        wellness3: 'linear-gradient(to left, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #4a5835 6%,  #4a5835 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #4a5835 82%, #4a5835 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        wellness4: 'linear-gradient(to left, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #374228 6%,  #374228 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #374228 82%, #374228 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        wellness5: 'linear-gradient(to left, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #14180eff 6%,  #14180eff 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #14180eff 82%, #14180eff 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        eir: 'linear-gradient(to right, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #5d785f 6%,  #5d785f 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #5d785f 82%, #5d785f 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        eir2: 'linear-gradient(to right, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #4d644f 6%,  #4d644f 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #4d644f 82%, #4d644f 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        eir3: 'linear-gradient(to right, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #3e503f 6%,  #3e503f 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #3e503f 82%, #3e503f 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
        eir4: 'linear-gradient(to right, #504c3f 0%, #504c3f 4%, #aa950fff 5%, #2e3c2f 6%,  #2e3c2f 19%, #aa950fff 20%, #504c3f 21%, #504c3f 80%, #aa950fff 81%, #2e3c2f 82%, #2e3c2f 90%, #aa950fff 91%, #504c3f 92%, #D1d5cc 100%)',
    };

    const bookCardStyle = {
        border: 'none',
        borderRadius: '15px',
        padding: '1.1rem 1rem',
        cursor: 'pointer',
        position: 'relative'
    };

    const runeBoxStyle = {
        width: '38px',
        height: '48px',
        borderRadius: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #aa950fff',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        color: '#aa950fff',
        fontSize: '22px'
    };

    const titleStyle = {
        fontFamily: "Nordic Chance",
        fontWeight: 250,
        fontStyle: "normal",
        fontSize: '35px',
        display: 'block',
        color: '#c5b39f',
        textShadow: '1px 4px 2px rgba(0,0,0,0.5)',
        letterSpacing: '2px',

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
            
                <Flex
                    direction="column"
                    style={{
                        width: '350px',
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 10,
                    }}
                >
                  
                    <Box style={{ padding: '1.5rem 1.5rem 1rem 0.5rem', background: 'transparent' }}>
                        <Box mb="0">
                            <img
                                src="/images/Eirlogo.png"
                                alt="Eir Logo"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    marginBottom: '0.5rem',
                                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                                }}
                            />
                        </Box>
                        <Separator size="4" style={{ background: 'rgba(170, 149, 15, 0.4)', }} />
                    </Box>

                    
                    <Box style={{ flex: 1, background: 'transparent', padding: '1rem 1.0rem', border: '1px solid goldenrod)', }}>
                        <Flex direction="column" gap="2" style={{ height: '100%' }}>
                            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.wellness }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ ...runeBoxStyle, marginRight: '5px' }}>ᚺ</Box>
                                        <Box style={{ flex: 1, textAlign: 'right' }}>
                                            <Text style={{ ...titleStyle, marginRight: '5px' }}>DASHBOARD</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Link>


                            <Link to="/entries/new" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.wellness2 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ ...runeBoxStyle, marginRight: '5px' }}>ᚱ</Box>
                                        <Box style={{ flex: 1, textAlign: 'right' }}>
                                            <Text style={{ ...titleStyle, marginRight: '5px' }}>NEW ENTRY</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Link>

                            <Link to="/entries" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.wellness3 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ ...runeBoxStyle, marginRight: '5px' }}>ᛊ</Box>
                                        <Box style={{ flex: 1, textAlign: 'right' }}>
                                            <Text style={{ ...titleStyle, marginRight: '25px' }}>JOURNAL</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Link>

                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.wellness4 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ ...runeBoxStyle, marginRight: '5px' }}>ᛗ</Box>
                                        <Box style={{ flex: 1, textAlign: 'right' }}>
                                            <Text style={{ ...titleStyle, marginRight: '30px' }}>PROFILE</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Link>

                            {user?.isAdmin && (
                                <Link to="/admin" style={{ textDecoration: 'none' }}>
                                    <Box style={{ ...bookCardStyle, background: bookGradients.wellness5 }}>
                                        <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                            <Box style={{ ...runeBoxStyle, marginRight: '5px' }}>ᚹ</Box>
                                            <Box style={{ flex: 1, textAlign: 'right' }}>
                                                <Text style={{ ...titleStyle, marginRight: '40px' }}>ADMIN</Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Link>
                            )}
                        </Flex>
                    </Box>


                   
                    <Box style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', backgroundColor: '#374228', height: '450px', border: '8px solid #b5c59f', borderRadius: '15px', }}>
                        <Separator size="4" style={{ background: 'rgba(23, 23, 22, 0.4)', marginBottom: '1rem' }} />
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '350px',
                            padding: '1rem',
                          
                            backgroundSize: '800px 1040px',
                            backgroundPosition: 'center',  //
                            backgroundRepeat: 'no-repeat',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            transform: 'scaleX(-1)', 
                            border: '8px solid #b5c59f',
                            borderRadius: '15px',
                        }}>
                            <Box style={{ transform: 'scaleX(-1)', marginTop: '20px' }}>
                                <Text size="5" style={{
                                    color: '#c5b39f',
                                    textShadow: '1px 4px 2px rgba(0,0,0,0.5)',
                                    letterSpacing: '2px', fontFamily: 'Nordic Chance', fontSize: '36px', marginLeft: '30px', marginTop: '30px',
                                }}>Logged in as</Text>
                                <Text size="5" weight="medium" style={{
                                    display: 'block', marginTop: '1.25rem', fontFamily: 'BlackChancery', fontSize: '30px', lineHeight: "1.2", color: '#c5b39f',
                                    textShadow: '1px 4px 2px rgba(0,0,0,0.5)', textAlign: 'center',
                                    letterSpacing: '1px',
                                }}>{user?.displayName || user?.email}</Text>
                                <Button style={{
                                    marginTop: '1rem', width: '100%', height: '100px', fontFamily: 'Nordic Chance', fontSize: '45px', background: 'rgba(34, 82, 46, 0.2)', border: '5px solid rgba(186, 196, 167, 0.4)', color: '#c5b39f',
                                    textShadow: '1px 4px 2px rgba(0,0,0,0.5)', textAlign: 'center',
                                    letterSpacing: '2px',
                                }} onClick={handleLogout}>LOG OUT</Button>
                            </Box>
                        </Box>
                    </Box>
                </Flex>

              
                <Box style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
            <Outlet />
                </Box>

                <Flex
                    direction="column"
                    style={{
                        width: '350px',
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 10,
                    }}
                >
                  
                    <Box style={{ padding: '1.0rem 1.0rem 1rem 0.5rem', background: 'transparent' }}>
                        <Box mb="0.5">
                            <Button
                                variant="ghost"
                                style={{
                                    padding: 0,
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    display: 'block',
                                    boxShadow: 'none', 
                                    outline: 'none',    
                                }}
                                onClick={handleEmergency} 
                            >
                                <img
                                    src="/images/Fa2.png"
                                    alt="Emergency Resources"
                                    style={{
                                        width: '350px',
                                        height: '350px',
                                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                                        marginTop: '1.0rem',

                                    }}

                                />
                            </Button>
                        </Box>
                        <Separator size="4" style={{ background: 'rgba(170, 149, 15, 0.4)', marginTop: '-3rem' }} />
                    </Box>

                
                    <Box style={{ flex: 1, background: 'transparent', padding: '1rem 1.5rem' }}>
                        <Flex direction="column" gap="2" style={{ height: '100%' }}>
                            <Link to="/who" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.eir }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ flex: 1, textAlign: 'Left' }}>
                                            <Text style={{ ...titleStyle, marginLeft: '18px' }}>ABOUT EIR</Text>
                                        </Box>
                                        <Box style={{ ...runeBoxStyle, marginLeft: '4px' }}>ᛃ</Box>
                                    </Flex>
                                </Box>
                            </Link>

                            <Link to="/Meditation" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.eir2 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ flex: 1, textAlign: 'Left' }}>
                                            <Text style={{ ...titleStyle, marginLeft: '22px' }}>Meditate</Text>
                                        </Box>
                                        <Box style={{ ...runeBoxStyle, marginLeft: '4px' }}>ᛟ</Box>
                                    </Flex>
                                </Box>
                            </Link>

                            <Link to="/BoxBreathing" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.eir3 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ flex: 1, textAlign: 'Left' }}>
                                            <Text style={{ ...titleStyle, marginLeft: '28px' }}>BREATHE</Text>
                                        </Box>
                                        <Box style={{ ...runeBoxStyle, marginLeft: '4px' }}>ᚾ</Box>
                                    </Flex>
                                </Box>
                            </Link>

                            <Link to="/Focus" style={{ textDecoration: 'none' }}>
                                <Box style={{ ...bookCardStyle, background: bookGradients.eir4 }}>
                                    <Flex align="center" gap="3" style={{ flexDirection: 'row-reverse' }}>
                                        <Box style={{ flex: 1, textAlign: 'Left' }}>
                                            <Text style={{ ...titleStyle, marginLeft: '45px' }}>FOCUS</Text>
                                        </Box>
                                        <Box style={{ ...runeBoxStyle, marginLeft: '4px' }}>ᚢ</Box>
                                    </Flex>
                                </Box>
                            </Link>
                        </Flex>
                    </Box>

                    
                    <Box style={{
                        padding: '1rem 1.5rem 1.5rem 1.5rem',
                        backgroundColor: '#374228',
                        border: '8px solid #b5c59f',
                        borderRadius: '15px',
                    }}>
                        <Separator size="4" style={{ marginBottom: '1rem' }} />

                        
                        <Text
                            size="3"
                            weight="bold"
                            style={{
                                fontFamily: 'Nordic Chance',
                                marginBottom: '0.8rem',
                                display: 'block',
                                marginLeft: '40px',
                                fontSize: '30px',
                                color: '#c5b39f',
                                textShadow: '1px 4px 2px rgba(0,0,0,0.5)',
                            }}
                        >
                            Listen to the Forrest
                        </Text>

                        <Box style={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}>
                            <iframe
                                title="Spotify Player"
                                src="https://open.spotify.com/embed/album/5MwzGfUCuxblJFiwmjHr1c?utm_source=generator"
                                width="100%"
                                height="352"
                                style={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    maxWidth: '660px',
                                }}
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                                referrerPolicy="origin"
                                onError={(e) => console.log("Spotify iframe error:", e)}
                            />
                        </Box>
                    </Box>

                  

                </Flex>
            </Flex>
        </Box>
    );
}