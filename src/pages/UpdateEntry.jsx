import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEntry, updateEntry } from '../services/entryService';
import { getEntryTypes } from '../services/entryTypeService';
import { getEmotions } from '../services/emotionService';
import { Container, Heading, Text, Flex, TextField, TextArea, Button, Box, Checkbox } from '@radix-ui/themes';

export default function EditEntry() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const [entryTypeId, setEntryTypeId] = useState('');
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [emotions, setEmotions] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [entryData, typesData, emotionsData] = await Promise.all([
                    getEntry(id),
                    getEntryTypes(),
                    getEmotions()
                ]);

                setTitle(entryData.title);
                setContent(entryData.content);
                setRecipient(entryData.recipient);
                setEntryTypeId(entryData.entryType.id.toString());
                setSelectedEmotions(entryData.emotions.map(e => e.id));
                setEntryTypes(typesData);
                setEmotions(emotionsData);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load entry. Please try again.');
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [id]);

    const handleEmotionToggle = (emotionId) => {
        setSelectedEmotions(prev =>
            prev.includes(emotionId)
                ? prev.filter(id => id !== emotionId)
                : [...prev, emotionId]
        );
    };

    const validateForm = () => {
        if (!title.trim()) return 'Title is required';
        if (!content.trim()) return 'Content is required';
        if (!recipient.trim()) return 'Recipient is required';
        if (!entryTypeId) return 'Please select an entry type';
        if (selectedEmotions.length === 0) return 'Please select at least one emotion';
        return null;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await updateEntry(id, {
                title,
                content,
                recipient,
                entryTypeId: parseInt(entryTypeId),
                emotionIds: selectedEmotions
            });

            navigate(`/entries/${id}`);
        } catch (err) {
            console.error('Error updating entry:', err);
            setError('Failed to update entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (loadingData) {
        return (
            <Container size="4" style={{ paddingTop: '2rem' }}>
                <Text style={{ fontFamily: 'Caesar Dressing', color: '#2c1810' }}>
                    Loading entry...
                </Text>
            </Container>
        );
    }

    return (
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
                    {/* Header with Cancel Button */}
                    <Flex justify="between" align="center" style={{ marginBottom: '1rem' }}>
                        <Heading
                            size="7"
                            style={{
                                fontFamily: 'Caesar Dressing',
                                color: '#2c1810',
                            }}
                        >
                            Edit Entry
                        </Heading>
                        <Button
                            variant="ghost"
                            onClick={() => navigate(`/entries/${id}`)}
                            style={{
                                fontFamily: 'Caesar Dressing',
                                color: '#2c1810',
                                background: 'transparent',
                            }}
                        >
                            Cancel
                        </Button>
                    </Flex>

                    {error && (
                        <Text color="red" size="2" style={{ textAlign: 'center', fontFamily: 'Caesar Dressing' }}>
                            {error}
                        </Text>
                    )}

                    <form onSubmit={handleUpdate}>
                        {/* TWO COLUMN LAYOUT */}
                        <Flex gap="8" style={{ marginTop: '1rem' }}>
                            {/* LEFT COLUMN - Title & Content */}
                            <Flex direction="column" gap="3" style={{ flex: 1, height: '100%' }}>
                                {/* Title */}
                                <Box>
                                    <Text
                                        as="label"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Title *
                                    </Text>
                                    <TextField.Root
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Give your entry a title"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid rgba(44, 24, 16, 0.3)',
                                            borderRadius: '0',
                                            fontFamily: 'Caesar Dressing',
                                        }}
                                    />
                                </Box>

                                {/* Content - TAKES UP REMAINING SPACE */}
                                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Text
                                        as="label"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Content *
                                    </Text>
                                    <TextArea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your thoughts here..."
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            fontFamily: 'Caesar Dressing',
                                            resize: 'none',
                                            flex: 1,
                                            minHeight: '400px',
                                        }}
                                    />
                                </Box>
                            </Flex>

                            {/* RIGHT COLUMN - Everything else */}
                            <Flex direction="column" gap="3" style={{ flex: 1 }}>
                                {/* Recipient */}
                                <Box>
                                    <Text
                                        as="label"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Recipient *
                                    </Text>
                                    <TextField.Root
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder="Who is this for?"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid rgba(44, 24, 16, 0.3)',
                                            borderRadius: '0',
                                            fontFamily: 'Caesar Dressing',
                                        }}
                                    />
                                </Box>

                                {/* Entry Type Dropdown */}
                                <Box>
                                    <Text
                                        as="label"
                                        size="2"
                                        mb="1"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        Entry Type *
                                    </Text>
                                    <select
                                        value={entryTypeId}
                                        onChange={(e) => setEntryTypeId(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: '1px solid rgba(44, 24, 16, 0.3)',
                                            fontSize: 'var(--font-size-2)',
                                            fontFamily: 'Caesar Dressing',
                                            background: 'rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        <option value="">Select an entry type</option>
                                        {entryTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                </Box>

                                {/* Emotions Checkboxes */}
                                <Box>
                                    <Text
                                        as="label"
                                        size="2"
                                        mb="2"
                                        weight="bold"
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            color: '#2c1810',
                                        }}
                                    >
                                        How are you feeling? *
                                    </Text>
                                    <Flex direction="column" gap="2">
                                        {emotions.map(emotion => (
                                            <Flex key={emotion.id} align="center" gap="2">
                                                <Checkbox
                                                    checked={selectedEmotions.includes(emotion.id)}
                                                    onCheckedChange={() => handleEmotionToggle(emotion.id)}
                                                />
                                                <Text
                                                    size="2"
                                                    style={{
                                                        fontFamily: 'Caesar Dressing',
                                                        color: '#2c1810',
                                                    }}
                                                >
                                                    {emotion.emotionName}
                                                </Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </Box>

                                {/* Update Button */}
                                <Flex direction="column" gap="3" mt="2" align="start">
                                    <Button
                                        type="submit"
                                        size="3"
                                        style={{
                                            width: '70%',
                                            fontFamily: 'Caesar Dressing',
                                            background: '#5d7a4a',
                                            color: 'white',
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Updating...' : 'Update Entry'}
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            </Box>
        </Container>
    );
}