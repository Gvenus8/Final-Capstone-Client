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

    // Release ceremony state
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
        // Show the release ceremony
        setShowReleaseCeremony(true);
    };

    const handleReleaseComplete = async () => {
        setShowReleaseCeremony(false);
        setIsDeleting(true);

        try {
            // Delete the entry after ceremony
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
                <Text style={{ fontFamily: 'Caesar Dressing', color: '#2c1810' }}>
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
                                fontFamily: 'Caesar Dressing',
                                color: '#2c1810',
                                textAlign: 'center'
                            }}
                        >
                            {error || 'Entry not found'}
                        </Text>
                        <Button
                            onClick={() => navigate('/entries')}
                            style={{
                                fontFamily: 'Caesar Dressing',
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
                {/* Notebook Background Container */}
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
                        {/* Back button */}
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/entries')}
                            style={{
                                alignSelf: 'flex-start',
                                fontFamily: 'Caesar Dressing',
                                color: '#2c1810',
                                background: 'transparent',
                                marginBottom: '1rem',
                            }}
                        >
                            ← Back to Entries
                        </Button>

                        {/* TWO COLUMN LAYOUT */}
                        <Flex gap="8" style={{ marginTop: '1rem' }}>
                            {/* LEFT COLUMN - Content */}
                            <Flex direction="column" gap="3" style={{ flex: 1 }}>
                                {/* Content section */}
                                <Box style={{ flex: 1 }}>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Message:
                                    </Text>
                                    <Text
                                        size="3"
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: '1.6',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        {entry.content}
                                    </Text>
                                </Box>
                            </Flex>

                            {/* RIGHT COLUMN - Metadata & Actions */}
                            <Flex direction="column" gap="3" style={{ flex: 1 }}>
                                {/* Title */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Title:
                                    </Text>
                                    <Text
                                        size="4"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        {entry.title}
                                    </Text>
                                </Box>

                                {/* Entry Type Badge */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Entry Type:
                                    </Text>
                                    <Badge
                                        size="2"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            background: 'rgba(93, 122, 74, 0.2)',
                                            color: '#2c1810',
                                        }}
                                    >
                                        {entry.entryType.typeName}
                                    </Badge>
                                </Box>

                                {/* Date */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Date:
                                    </Text>
                                    <Text
                                        size="2"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        {formatDate(entry.createdAt)}
                                    </Text>
                                </Box>

                                {/* Recipient */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        To:
                                    </Text>
                                    <Text
                                        size="3"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        {entry.recipient}
                                    </Text>
                                </Box>

                                {/* Emotions */}
                                <Box>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
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
                                                    fontFamily: 'Caesar Dressing',
                                                    background: 'rgba(139, 90, 143, 0.2)',
                                                    color: '#2c1810',
                                                }}
                                            >
                                                {emotion.emotionName}
                                            </Badge>
                                        ))}
                                    </Flex>
                                </Box>

                                <Separator size="4" style={{ background: 'rgba(44, 24, 16, 0.2)', marginTop: '1rem' }} />

                                {/* Action Buttons */}
                                <Flex direction="column" gap="3" mt="2">
                                    <Button
                                        size="3"
                                        onClick={() => navigate(`/entries/${id}/edit`)}
                                        style={{
                                            width: '70%',
                                            fontFamily: 'Caesar Dressing',
                                            background: '#5d7a4a',
                                            color: 'white',
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
                                            fontFamily: 'Caesar Dressing',
                                            background: '#8b5a8f',
                                            color: 'white',
                                        }}
                                    >
                                        {isDeleting ? 'Releasing...' : '🎈 Release & Let Go'}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Container>

            {/* Release Ceremony Overlay */}
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