import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEntry } from '../services/entryService';
import { getEntryTypes } from '../services/entryTypeService';
import { getEmotions } from '../services/emotionService';
import { Container, Heading, Text, Flex, TextField, TextArea, Button, Box, Checkbox } from '@radix-ui/themes';
import ReleaseCeremony from './ReleaseCeremony';

export default function CreateEntry() {
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

    const [showReleaseCeremony, setShowReleaseCeremony] = useState(false);
    const [entryToRelease, setEntryToRelease] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesData, emotionsData] = await Promise.all([
                    getEntryTypes(),
                    getEmotions()
                ]);
                setEntryTypes(typesData);
                setEmotions(emotionsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed');
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

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

    const handleSave = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await createEntry({
                title,
                content,
                recipient,
                entryTypeId: parseInt(entryTypeId),
                emotionIds: selectedEmotions
            });

            navigate('/dashboard');
        } catch (err) {
            console.error('Error creating entry:', err);
            setError('Failed to create entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRelease = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');

        
        setEntryToRelease({
            title,
            content,
            recipient
        });
        setShowReleaseCeremony(true);
    };

    const handleReleaseComplete = async () => {
        setShowReleaseCeremony(false);
       
        navigate('/entries');
    };

    if (loadingData) {
        return (
            <Container size="4" style={{ paddingTop: '2rem' }}>
                <Text>Loading...</Text>
            </Container>
        );
    }

    return (
        <>
            <Container size="4" style={{ paddingTop: '12rem', paddingBottom: '1rem' }}>
               
                        <Heading
                            size="4"
                            style={{
                                position: 'absolute',
                                top: '19rem', 
                                left: '50%',
                                transform: 'translateX(-50%)', 
                                textAlign: 'center',
                                fontFamily: 'BlackChancery',
                                color: '#374228',
                                fontSize: '50px',
                                letterSpacing: '-2px',
                                width: '100%',
                                zIndex: 2, 
                                  
                                
                            }}
                        >
                            Create New Entry
                        </Heading>
                <Box
                    style={{
                        backgroundImage: 'url(/images/notebook.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        padding: '4rem 5rem',
                        minHeight: '900px',
                        width: '100%',
                        marginTop: '2rem',
                    }}
                >
                            <Flex direction="column" gap="3 style={{ marginTop: '2rem' }}">

                        {error && (
                            <Text color="red" size="2" style={{ textAlign: 'center' }}>
                                {error}
                            </Text>
                        )}

                        <form>
                           
                            <Flex gap="8" style={{ marginTop: '5rem' }}>
                              
                                <Flex direction="column" gap="3" style={{ flex: 1, height: '100%' }}>
                                 
                                    <Box>
                                        <Text
                                            as="label"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                            style={{
                                                fontFamily: 'BlackChancery',
                                                color: '#2c1810',
                                                fontSize: '34px',
                                                marginTop: '1.0rem',
                                                
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
                                                fontFamily: 'BlackChancery',
                                                fontSize: '28px',
                                                marginTop: '10px',
                                                height: '50px',

                                            }}
                                        />
                                    </Box>

                                    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Text
                                            as="label"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                color: '#2c1810',
                                                fontSize: '34px',
                                                marginTop: '5px',
                                            }}
                                        >
                                            Content *
                                        </Text>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Write your thoughts here..."
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid rgba(44, 24, 16, 0.3)',
                                                fontFamily: 'blackchancery',
                                                resize: 'none',
                                                flex: 1,
                                                minHeight: '500px',
                                                fontSize: '28px ',
                                                marginTop: '10px',
                                                overflowY: 'auto',
                                            }}
                                        />
                                    </Box>
                                </Flex>

                            
                                <Flex direction="column" gap="3" style={{ flex: 1 }}>
                                  
                                    <Box>
                                        <Text
                                            as="label"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                color: '#2c1810',
                                                fontSize: '34px',
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
                                                fontFamily: 'BlackChancery',
                                                fontSize: '28px',
                                                marginTop: '10px',
                                                height: '50px',
                                            }}
                                        />
                                    </Box>

                                   
                                    <Box>
                                        <Text
                                            as="label"
                                            size="2"
                                            mb="1"
                                            weight="bold"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                fontSize: '25px',
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
                                                height: '40px',
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: '1px solid rgba(44, 24, 16, 0.3)',
                                                fontSize: 'var(--font-size-2)',
                                                fontFamily: 'blackchancery',
                                                background: 'rgba(255, 255, 255, 0.5)',
                                                marginTop: '10px',
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

                                    
                                    <Box>
                                        <Text
                                            as="label"
                                            size="2"
                                            mb="2"
                                            weight="bold"
                                            style={{
                                                fontFamily: 'BlackChancery',
                                                color: '#2c1810',
                                                fontSize: '30px',
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
                                                            fontFamily: 'blackchancery',
                                                            color: '#2c1810',
                                                            fontSize: '22px',
                                                            marginTop: '4px',
                                                        }}
                                                    >
                                                        {emotion.emotionName}
                                                    </Text>
                                                </Flex>
                                            ))}
                                        </Flex>
                                    </Box>

                                 
                                    <Flex direction="column" gap="3" mt="2" align="start">
                                        <Button
                                            type="button"
                                            size="3"
                                            style={{
                                                width: '65%',
                                                fontFamily: 'Nordic Chance',
                                                background: '#5d7a4a',
                                                color: 'white',
                                                fontSize: '34px',
                                            }}
                                            onClick={handleSave}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Saving...' : 'Save Entry'}
                                        </Button>
                                        <Button
                                            type="button"
                                            size="3"
                                            style={{
                                                width: '65%',
                                                fontFamily: 'Nordic Chance',
                                                background: '#374228',
                                                color: 'white',
                                                fontSize: '34px',
                                            }}
                                            onClick={handleRelease}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Releasing...' : 'Release'}
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </form>
                    </Flex>
                </Box>
            </Container>

          
            {showReleaseCeremony && (
                <ReleaseCeremony
                    entry={entryToRelease}
                    onComplete={handleReleaseComplete}
                    onCancel={() => setShowReleaseCeremony(false)}
                />
            )}
        </>
    );
}