import { useAuth } from '../contexts/AuthContext';
import { Container, Heading, Text, Flex, Button, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';


export default function Meditation() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Container size="4" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="4"
            >
               
                <img
                    src="/images/345.png"
                    alt="Meditation"
                    width="600"
                    height="600"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />

              
                <Box style={{
                    width: '100%',
                    backgroundColor: '#374228',
                    border: '12px outset #b5c59f',
                    borderRadius: '5px',
                    padding: '3rem',
                }}>
                    <Flex direction="column" align="center" gap="5">
                       
                        <Text size="5" style={{
                            fontFamily: 'BlackChancery',
                            fontSize: '30px',
                            lineHeight: '1.3',
                            color: '#b5c59f',
                            textAlign: 'center',
                            maxWidth: '800px',
                        }}>
                            Step into stillness and find healing in the presence of Eir, the Norse goddess of mercy and renewal. Let her calm strength guide you inward as you rest beneath the quiet rhythm of your own breath. This meditation invites you to reconnect with balance, peace, and the wisdom of the natural world—where healing begins from within.
                            <br /><br />
                            This nordic guided meditation "Under the Tree" was created by Kati Rán.
                        </Text>

                  
                        <Box style={{
                            width: '100%',
                            maxWidth: '800px',
                            aspectRatio: '16/9',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/7Pj_ucrL-uQ?si=aSvp0KwQaPtp9438"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                style={{
                                    border: 'none',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
}