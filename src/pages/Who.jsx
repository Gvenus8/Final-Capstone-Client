import { useAuth } from '../contexts/AuthContext';
import { Container, Heading, Text, Flex, Button, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export default function Who() {
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
                    src="/images/whoiseir2.png"
                    alt="Eir - Norse Goddess of Healing"
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
                    borderRadius: '25px',
                    padding: '3rem',
                }}>
                    <Flex direction="column" align="center" gap="5">
                    
                        <Text size="5" style={{
                            fontFamily: 'BlackChancery',
                            fontSize: '27px',
                            lineHeight: '1.2',
                            color: ' #b5c59f',
                            textAlign: 'center',
                            maxWidth: '900px',
                        }}>
                            Eir is a revered yet mysterious figure in Norse mythology, celebrated as the goddess of healing and mercy.
                            Her name, which means "help" or "protection" in Old Norse, reflects her compassionate and nurturing nature.
                            She is often described as the finest of physicians, possessing unmatched skill in the healing arts.
                            In some sources, Eir is listed among the Valkyries—female spirits who choose who lives and dies in battle—suggesting she may have guided not only warriors' fates but also their recovery and renewal.
                            She is also mentioned as one of the maidens of the goddess Menglöð, residing on Lyfjaberg, the "Hill of Healing," where those seeking wellness would pray for aid.
                            Though few myths about her survive, Eir's legacy endures as a divine symbol of restoration, compassion, and the sacred balance between life and death—a presence of calm and care amid the harsh world of the Norse gods.
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
                                src="https://www.youtube.com/embed/UfDZ4iRe6Rs?si=GoVPHqQYLIkB-AdX"
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