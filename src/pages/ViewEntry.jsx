import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntry, deleteEntry } from '../services/entryService';
import { Container, Heading, Text, Flex, Button, Box, Badge, Separator } from '@radix-ui/themes';
import ReleaseCeremony from './ReleaseCeremony';

export default function ViewEntry() {
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    
    const [showReleaseCeremony, setShowReleaseCeremony] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const data = await getEntry(id);
                setEntry(data);
            } catch (err) {
                console.error('Error fetching entry:', err);
                setError('Failed to load entry.');
            } finally {
                setLoading(false);
            }
        };

        fetchEntry();
    }, [id]);

    const handleRelease = () => {
       
        setShowReleaseCeremony(true);
    };

    const handleReleaseComplete = async () => {
        setShowReleaseCeremony(false);
        setIsDeleting(true);

        try {
         
            await deleteEntry(id);
            navigate('/entries');
        } catch (err) {
            console.error('Error deleting entry:', err);
            setError('Failed to release entry. Please try again.');
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <Container size="4" style={{ paddingTop: '2rem' }}>
                <Text style={{ fontFamily: 'blackchancery', color: '#2c1810' }}>
                    Loading entry...
                </Text>
            </Container>
        );
    }

    if (error || !entry) {
        return (
            <Container size="4" style={{ paddingTop: '2rem' }}>
                <Box
                    style={{
                        backgroundImage: 'url(/images/notebook.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        padding: '4rem 5rem',
                        minHeight: '500px',
                    }}
                >
                    <Flex direction="column" gap="4" align="center" justify="center" style={{ minHeight: '400px' }}>
                        <Text
                            size="5"
                            style={{
                                fontFamily: 'blackchancery',
                                color: '#2c1810',
                                textAlign: 'center'
                            }}
                        >
                            {error || 'Entry not found'}
                        </Text>
                        <Button
                            onClick={() => navigate('/entries')}
                            style={{
                                fontFamily: 'blackchancery',
                                background: '#5d7a4a',
                                color: 'white',
                            }}
                        >
                            Back to Entries
                        </Button>
                    </Flex>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <Container size="4" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                
                <Box
                    style={{
                        backgroundImage: 'url(/images/notebook.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        padding: '4rem 5rem',
                        minHeight: '900px',
                        width: '100%',
                    }}
                >
                    <Flex direction="column" gap="3">
                      
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/entries')}
                            style={{
                                alignSelf: 'flex-start',
                                fontFamily: 'blackchancery',
                                color: '#374228',
                                background: 'transparent',
                                marginBottom: '1rem',
                                fontSize: '40px',
                            }}
                        >
                            ← Back to Entries
                        </Button>

                       
                        <Flex gap="8" style={{ marginTop: '1rem' }}>
                           
                            <Flex direction="column" gap="3" style={{ flex: 1 }}>
                               
                                <Box style={{ flex: 1 }}>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '35px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                        }}
                                    >
                                        Message:
                                    </Text>
                                    <Text
                                        size="3"
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: '1.6',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            marginTop: '0.5rem',
                                        }}
                                    >
                                        {entry.content}
                                    </Text>
                                </Box>
                            </Flex>

                            
                            <Flex direction="column" gap="5" style={{ flex: 1 }}>
                                {/* Title */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '20px',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                            
                                        }}
                                    >
                                        Title:
                                    </Text>
                                    <Text
                                        size="4"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '35px',
                                            paddingBottom: '10px',
                                            textAlign: 'center',

                                        }}
                                    >
                                        {entry.title}
                                    </Text>
                                </Box>

                                
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '1.1rem',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                        }}
                                    >
                                        Entry Type:
                                    </Text>
                                    <Badge
                                        size="2"
                                        style={{
                                            fontFamily: 'blackchancery',
                                            background: 'rgba(93, 122, 74, 0.2)',
                                            color: '#2c1810',
                                            fontSize: '35px',
                                            textAlign: 'center',
                                            marginTop: '0.5rem',
                                        }}
                                    >
                                        {entry.entryType.typeName}
                                    </Badge>
                                </Box>

                               
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '1.7rem',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                        }}
                                    >
                                        Date:
                                    </Text>
                                    <Text
                                        size="2"
                                        style={{
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '35px',
                                        }}
                                    >
                                        {formatDate(entry.createdAt)}
                                    </Text>
                                </Box>

                               
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '1.3rem',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                        }}
                                    >
                                        To:
                                    </Text>
                                    <Text
                                        size="3"
                                        style={{
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '35px',
                                        }}
                                    >
                                        {entry.recipient}
                                    </Text>
                                </Box>

                                
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '1rem',
                                            fontFamily: 'blackchancery',
                                            color: '#2c1810',
                                            fontSize: '30px',
                                            textAlign: 'center',
                                            borderBottom: '2px solid rgba(44, 24, 16, 0.2)',
                                        }}
                                    >
                                        Emotions:
                                    </Text>
                                    <Flex gap="2" wrap="wrap">
                                        {entry.emotions.map(emotion => (
                                            <Badge
                                                key={emotion.id}
                                                variant="soft"
                                                style={{
                                                    fontFamily: 'blackchancery',
                                                    background: 'rgba(139, 90, 143, 0.2)',
                                                    color: '#2c1810',
                                                    fontSize: '35px',
                                                    marginTop: '0.5rem',
                                                }}
                                            >
                                                {emotion.emotionName}
                                            </Badge>
                                        ))}
                                    </Flex>
                                </Box>

                                <Separator size="4" style={{ background: 'rgba(44, 24, 16, 0.2)', marginTop: '1rem' }} />

                                
                                <Flex direction="column" gap="3" mt="2">
                                    <Button
                                        size="3"
                                        onClick={() => navigate(`/entries/${id}/edit`)}
                                        style={{
                                            width: '70%',
                                            fontFamily: 'Nordic Chance',
                                            background: '#5d7a4a',
                                            color: 'white',
                                            fontSize: '34px',
                                        }}
                                    >
                                        Edit Entry
                                    </Button>
                                    <Button
                                        size="3"
                                        onClick={handleRelease}
                                        disabled={isDeleting}
                                        style={{
                                            width: '70%',
                                            fontFamily: 'Nordic Chance',
                                            background: '#8b5a8f',
                                            color: 'white',
                                            fontSize: '34px',
                                        }}
                                    >
                                        {isDeleting ? 'Releasing...' : 'Release Entry'}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Container>

           
            {showReleaseCeremony && entry && (
                <ReleaseCeremony
                    entry={{
                        title: entry.title,
                        content: entry.content,
                        recipient: entry.recipient
                    }}
                    onComplete={handleReleaseComplete}
                    onCancel={() => setShowReleaseCeremony(false)}
                />
            )}
        </>
    );
}