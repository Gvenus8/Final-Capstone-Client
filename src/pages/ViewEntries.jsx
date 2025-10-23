import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEntries } from '../services/entryService';
import { getEntryTypes } from '../services/entryTypeService';
import { Container, Heading, Text, Flex, Card, Button, Box } from '@radix-ui/themes';

export default function EntriesList() {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [entryTypes, setEntryTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedType, setSelectedType] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [entriesResponse, typesData] = await Promise.all([
                    getEntries(page, 10),
                    getEntryTypes()
                ]);
                setEntries(entriesResponse.data);
                setFilteredEntries(entriesResponse.data);
                setEntryTypes(typesData);
                setTotalPages(entriesResponse.totalPages);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load entries. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        let result = [...entries];

        if (selectedType !== 'all') {
            result = result.filter(entry => entry.entryType.id === parseInt(selectedType));
        }

        if (sortOrder === 'newest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        setFilteredEntries(result);
    }, [entries, selectedType, sortOrder]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getSpineColor = (entryTypeId) => {
        const colors = {
            1: '#505e3c',
            2: '#2a2f1d',
            3: '#858d32',
            4: '#adb595',
            5: '#d1d5cc',
        };
        return colors[entryTypeId] || '#5d7a4a';
    };

    if (loading) {
        return (
            <Container size="3" style={{ paddingTop: '2rem' }}>
                <Text style={{ fontFamily: 'Caesar Dressing', color: '#2c1810' }}>
                    Loading your sacred chronicles...
                </Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="3" style={{ paddingTop: '2rem' }}>
                <Text color="red" style={{ fontFamily: 'Caesar Dressing' }}>{error}</Text>
            </Container>
        );
    }

    return (
        <Container size="3" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <style>{`
            .book-spine-card {
                background: linear-gradient(to left,
                    #5c6231ff  0%,  #5c6231ff 4%, #aa950fff 5%,  #5c6231ff 6%,  #5c6231ff 7%, #aa950fff 8%,
                    #5c6231ff 9% 10%, #aa950fff 11%, #5c6231ff 12%, #aa950fff 13%, #5c6231ff 14%,
                    #5c6231ff 80%, #aa950fff 81%, var(--entry-color) 82%, var(--entry-color) 93%,
                    #aa950fff 94%, #5c6231ff 95%, #5c6231ff 99%,#D1d5cc 100%);
                border: none;
                box-shadow: 
                    inset -3px 0 8px rgba(0,0,0,0.4),
                    inset 3px 0 5px rgba(255,255,255,0.05),
                    4px 4px 12px rgba(0,0,0,0.5);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                position: relative;
                min-height: 120px;
                border-radius: 12px;
            }

            .book-spine-card:hover {
                transform: translateX(8px) scale(1.02);
                box-shadow: 
                    inset -4px 0 12px rgba(0,0,0,0.5),
                    inset 4px 0 8px rgba(255,255,255,0.08),
                    8px 8px 25px rgba(0,0,0,0.6);
            }

            .book-spine-card::before {
                content: '';
                position: absolute;
                left: -2px;
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
                border-radius: 12px 0 0 12px;
            }

            .filter-shelf {
                background: linear-gradient(135deg, #374228 0%, #374228 100%);
                border: 2px solid #5a3d2b;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
        `}</style>

            <Flex direction="column" gap="1" style={{
                marginTop:'200px'
            }}>
                {/* Header */}
                <Flex justify="between" align="center">
                    <Heading
                        size="8"
                        style={{
                            fontFamily: 'BlackChancery',
                            color: '#374228',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            fontSize: '48px',
                        }}
                    >
                        Sacred Chronicles
                    </Heading>
                    <Button
                        onClick={() => navigate('/entries/new')}
                        style={{
                            fontFamily: 'blackchancery',
                            background: 'linear-gradient(135deg, #374228 0%, #374228 100%)',
                            color: 'white',
                            
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            fontSize: '18px',
                        }}
                    >
                        Create Entry
                    </Button>
                </Flex>

                {/* Filters */}
                <Box
                    className="filter-shelf"
                    style={{
                        borderRadius: '5px',
                        padding: '1.0rem',
                        marginTop: '1rem',
                       

                    }}
                >
                    <Flex gap="4" wrap="wrap">
                        <Box style={{ minWidth: '200px', flex: 1 }}>
                            <Text
                                as="label"
                                size="2"
                                weight="bold"
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'blackchancery ',
                                    color: '#bac4a7',
                                    fontSize: '25px',
                                }}
                            >
                                Filter by Type
                            </Text>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(170, 149, 15, 0.5)',
                                    fontSize: '20px',
                                    fontFamily: 'blackchancery',
                                    background: '#c6d2b6',
                                    color: '#2c1810',
                                }}
                            >
                                <option value="all">All Types</option>
                                {entryTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.typeName}
                                    </option>
                                ))}
                            </select>
                        </Box>

                        <Box style={{ minWidth: '200px', flex: 1 }}>
                            <Text
                                as="label"
                                size="2"
                                weight="bold"
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'blackchancery',
                                    color: '#bac4a7',
                                    fontSize: '25px',
                                }}
                            >
                                Sort by Date
                            </Text>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(170, 149, 15, 0.5)',
                                    
                                    fontFamily: 'blackchancery',
                                    background: '#c6d2b6',
                                    color: '#2c1810',
                                    fontSize: '20px',
                                }}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </Box>
                    </Flex>
                </Box>

               
                <Box
                    style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                        border: '14px solid #374228',
                        borderRadius: '5px',
                        padding: '.25rem',
                        boxShadow:
                            'inset 0 4px 8px rgba(0, 0, 0, 0.6), ' +
                            '0 8px 20px rgba(0, 0, 0, 0.4)',
                    }}
                >
                    {filteredEntries.length === 0 ? (
                        <Box
                            style={{
                                background: 'linear-gradient(to bottom, #f9f6f0 0%, #ebe7dc 100%)',
                                border: '1px solid rgba(139, 90, 43, 0.3)',
                                borderRadius: '12px',
                                padding: '3rem',
                                boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <Flex direction="column" align="center" gap="4">
                                <Text
                                    size="5"
                                    style={{
                                        fontFamily: 'blackchancery',
                                        color: '#2c1810',
                                        fontSize: '35px',
                                    }}
                                >
                                    {entries.length === 0 ? 'No tales inscribed yet' : 'No tales match your search'}
                                </Text>
                                <Text
                                    size="3"
                                    style={{
                                        fontFamily: 'blackchancery',
                                        color: 'rgba(44, 24, 16, 0.7)',
                                        fontSize: '30px',
                                    }}
                                >
                                    {entries.length === 0
                                        ? 'Begin your journey by inscribing your first tale'
                                        : 'Try adjusting the rune filters above'
                                    }
                                </Text>
                                {entries.length === 0 && (
                                    <Button
                                        size="3"
                                        onClick={() => navigate('/entries/new')}
                                        style={{
                                            fontFamily: 'Nordic Chance',
                                            background: '#5d7a4a',
                                            marginTop: '1rem',
                                            fontSize: '34px',
                                        }}
                                    >
                                        Create Entry
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    ) : (
                        <>
                            <Flex direction="column" gap="3">
                                {filteredEntries.map((entry) => (
                                    <Card
                                        key={entry.id}
                                        className="book-spine-card"
                                        style={{
                                            '--entry-color': getSpineColor(entry.entryType?.id),
                                        }}
                                        onClick={() => navigate(`/entries/${entry.id}`)}
                                    >
                                        <Flex
                                            align="center"
                                            style={{
                                                height: '100%',
                                                
                                                maxWidth: '100%',
                                                marginLeft: '20%',
                                                marginTop: '1rem',
                                            }}
                                        >

                                            <Flex
                                                direction="column"
                                                style={{
                                                    flex: '1 1 auto',
                                                    minWidth: 0,
                                                    maxWidth: '600px',
                                                }}
                                                gap="1"
                                            >
                                                <Text
                                                    size="4"
                                                    weight="bold"
                                                    style={{
                                                        fontFamily: 'blackchancery',
                                                        color: '#bac4a7',
                                                        fontSize: '34px', 
                                                        
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {entry.title}
                                                    
                                                </Text>
                                                <Text
                                                    size="2"
                                                    style={{
                                                        fontFamily: 'BlackChancery',
                                                        color: '#bac4a7',
                                                        fontSize: '19px',
                                                        marginTop: '0.55rem',
                                                    }}
                                                >
                                                    {formatDate(entry.createdAt)}
                                                </Text>
                                                        <Box style={{
                                                            width: '150px',
                                                            minWidth: '150px',
                                                            maxWidth: '150px',
                                                            marginRight: '1.5rem',
                                                        }}>
                                                            <Text
                                                                size="2"
                                                                weight="bold"
                                                                style={{
                                                                    fontFamily: 'Nordic Chance',
                                                                    color: '#aa950fff',
                                                                    fontSize: '18px',
                                                                    textTransform: 'uppercase',
                                                                }}
                                                            >
                                                                {entry.entryType?.typeName || 'Entry'}
                                                            </Text>
                                                        </Box>
                                            </Flex>

                                            <Text
                                                size="3"
                                                style={{
                                                    color: '#D1d5cc',
                                                    fontWeight: 'bold',
                                                    marginLeft: 'auto',
                                                    paddingLeft: '1rem',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                →
                                            </Text>
                                        </Flex>
                                    </Card>
                                ))}
                            </Flex>

                            {totalPages > 1 && (
                                <Flex justify="center" gap="3" mt="4">
                                    <Button
                                        variant="soft"
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            background: page === 1 ? 'rgba(93, 122, 74, 0.3)' : '#5d7a4a',
                                            color: page === 1 ? 'rgba(44, 24, 16, 0.5)' : 'white',
                                        }}
                                    >
                                        ← Previous
                                    </Button>
                                    <Text
                                        size="2"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontFamily: 'Caesar Dressing',
                                            color: '#bac4a7',
                                        }}
                                    >
                                        Scroll {page} of {totalPages}
                                    </Text>
                                    <Button
                                        variant="soft"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                        style={{
                                            fontFamily: 'Caesar Dressing',
                                            background: page === totalPages ? 'rgba(93, 122, 74, 0.3)' : '#5d7a4a',
                                            color: page === totalPages ? 'rgba(44, 24, 16, 0.5)' : 'white',
                                        }}
                                    >
                                        Next →
                                    </Button>
                                </Flex>
                            )}
                        </>
                    )}
                </Box>
                
            </Flex>
        </Container>
    );
}