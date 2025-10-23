import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile, deleteUserProfile } from '../services/UserProfileService';
import { getEmotionStats } from '../services/emotionService';
import { Container, Heading, Text, Flex, TextField, Button, Box, Separator } from '@radix-ui/themes';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getEntryCount } from '../services/entryService';

export default function Profile() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [entryCount, setEntryCount] = useState(0);
    const [loadingCount, setLoadingCount] = useState(true);


   
    const [emotionStats, setEmotionStats] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

   
    useEffect(() => {
        const fetchEntryCount = async () => {
            try {
                const result = await getEntryCount();
                setEntryCount(result.count);
            } catch (err) {
                console.error('Error fetching entry count:', err);
            } finally {
                setLoadingCount(false);
            }
        };

        fetchEntryCount();
    }, []);
    useEffect(() => {
        const fetchEmotionStats = async () => {
            try {
                const stats = await getEmotionStats();
                
                const formattedStats = stats.map(stat => ({
                    name: stat.emotion,
                    value: stat.count
                }));
                setEmotionStats(formattedStats);
            } catch (err) {
                console.error('Error fetching emotion stats:', err);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchEmotionStats();
    }, []);

 
    const COLORS = ['#5d7a4a', '#858d32', '#adb595', '#8b5a8f', '#505e3c', '#d1d5cc', '#2a2f1d'];

    const handleSave = async (e) => {
        e.preventDefault();

        if (!displayName.trim()) {
            setError('Display name cannot be empty');
            return;
        }

        setError('');
        setSuccess('');
        setIsSaving(true);

        try {
            const updatedUser = await updateUserProfile({ displayName });
            login(updatedUser);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating:', err);
            setError('Failed. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const firstConfirm = window.confirm(
            '⚠️ Are you sure you want to delete your account? This cannot be undone.'
        );

        if (!firstConfirm) return;

        const secondConfirm = window.confirm(
            'FINAL WARNING: This action is PERMANENT. All your data will be lost forever. Are you absolutely sure?'
        );

        if (!secondConfirm) return;

        setIsDeleting(true);
        setError('');

        try {
            await deleteUserProfile();
            await logout();
            navigate('/auth/login');
        } catch (err) {
            console.error('Error deleting account:', err);
            setError('Failed to delete account. Please try again.');
            setIsDeleting(false);
        }
    };

    const handleCancel = () => {
        setDisplayName(user?.displayName || '');
        setIsEditing(false);
        setError('');
        setSuccess('');
    };

    return (
        <Container size="4" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <style>{`
               

                .stat-label {
                    font-family: 'blackchancery';
                    color: rgba(44, 24, 16, 0.7);
                    font-size: 24px;
                    
                    letter-spacing: 1px;
                }

                .stat-value {
                    font-family: 'blackchancery';
                    color: #2c1810;
                    font-size: 24px;
                    
                }

                .danger-zone {
                    background: #374228;
                    border: 2px dashed rgba(139, 26, 26, 0.5);
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-top: 2rem;
                }
            `}</style>

      
            <Box
                style={{
                    backgroundImage: 'url(/images/notebook.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    padding: '4rem 5rem',
                    minHeight: '900px',
                    width: '100%',
                    position: 'relative',
                }}
            >
                <Flex direction="column" gap="5" align="center">
                 
                    <Flex direction="column" align="center" gap="3" style={{ marginTop: '-1rem' }}>
                        
                        <Heading
                            size="8"
                            style={{
                                fontFamily: 'blackchancery',
                                color: '#374228',
                                textAlign: 'left',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            }}
                        >
                            My Journey
                        </Heading>
                    </Flex>

                   
                    {error && (
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'blackchancery',
                                color: '#8b1a1a',
                                textAlign: 'center',
                                background: 'rgba(255, 240, 240, 0.8)',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                            }}
                        >
                            {error}
                        </Text>
                    )}

                    {success && (
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'blackchancery',
                                color: '#2a5c1a',
                                textAlign: 'center',
                                background: 'rgba(240, 255, 240, 0.8)',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                            }}
                        >
                            {success}
                        </Text>
                    )}

                 
                    <Flex gap="8" style={{ marginTop: '2rem', width: '100%' }}>
                       
                        <Flex direction="column" gap="5" style={{ flex: 1 }}>
                            
                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'blackchancery',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
                                        fontSize: '38px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Account Information
                                </Text>

                                <form onSubmit={handleSave}>
                                    <Flex direction="column" gap="4">
                                       
                                        <Box>
                                            <Text className="stat-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'center' }}>
                                                Scroll Address (Email)
                                            </Text>
                                            <Text
                                                size="3"
                                                style={{
                                                    fontFamily: 'blackchancery',
                                                    color: '#2c1810',
                                                    padding: '0.5rem',
                                                    background: 'rgba(249, 246, 240, 0.5)',
                                                    borderRadius: '4px',
                                                    display: 'block',
                                                    fontSize: '34px',
                                                    textAlign: 'center',
                                                    letterSpacing: '4px',
                                                }}
                                            >
                                                {user?.email || ''}
                                            </Text>
                                            <Text
                                                size="1"
                                                style={{
                                                    fontFamily: 'blackchancery',
                                                    color: 'rgba(44, 24, 16, 0.5)',
                                                   
                                                    marginTop: '1.15rem',
                                                    display: 'block',
                                                    fontSize: '15px',
                                                    textAlign:'center'
                                                }}
                                            >
                                                Email cannot be changed
                                            </Text>
                                        </Box>

                                     
                                        <Box>
                                            <Text className="stat-label" style={{ display: 'block', marginBottom: '0.7rem', textAlign: 'center' }}>
                                                Chronicler's Name
                                            </Text>
                                            {isEditing ? (
                                                <TextField.Root
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    placeholder="Enter your display name"
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        borderBottom: '1px solid rgba(44, 24, 16, 0.3)',
                                                        borderRadius: '0',
                                                        fontFamily: 'blackchancery',
                                                        fontSize: '28px',
                                                    }}
                                                />
                                            ) : (
                                                <Text
                                                    size="3"
                                                    style={{
                                                        fontFamily: 'blackchancery',
                                                        color: '#2c1810',
                                                        padding: '0.4rem',
                                                        background: 'rgba(249, 246, 240, 0.5)',
                                                        borderRadius: '4px',
                                                        display: 'block',
                                                        fontSize: '28px',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {displayName}
                                                </Text>
                                            )}
                                        </Box>

                                        
                                        {!isEditing ? (
                                            <Button
                                                type="button"
                                                size="3"
                                                onClick={() => setIsEditing(true)}
                                                style={{
                                                    width: '70%',
                                                    fontFamily: 'Nordic chance',
                                                    background: '#5d7a4a',
                                                    color: 'white',
                                                    fontSize: '34px',
                                                    margin: '0 auto',
                                                }}
                                            >
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <Flex gap="3">
                                                <Button
                                                    type="submit"
                                                    size="3"
                                                    disabled={isSaving}
                                                    style={{
                                                        flex: 1,
                                                        fontFamily: 'blackchancery',
                                                        background: '#5d7a4a',
                                                        color: 'white',
                                                    }}
                                                >
                                                    {isSaving ? 'Saving...' : '✓ Save Changes'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="3"
                                                    onClick={handleCancel}
                                                    disabled={isSaving}
                                                    style={{
                                                        flex: 1,
                                                        fontFamily: 'runey tunes revisited nf',
                                                        background: 'rgba(93, 122, 74, 0.3)',
                                                        color: '#2c1810',
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Flex>
                                        )}
                                    </Flex>
                                </form>
                            </Box>

                            <Separator size="4" style={{ background: 'rgba(44, 24, 16, 0.2)' }} />

                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'blackchancery',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
                                        fontSize: '28px',
                                    }}
                                >
                                    Chronicle Records
                                </Text>

                                <Flex direction="column" gap="3">
                                 
                                    <Flex justify="between" align="center">
                                        <Text className="stat-label">Journey Began:</Text>
                                        <Text className="stat-value">
                                            {new Date().toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </Text>
                                    </Flex>

                                   
                                    <Flex justify="between" align="center">
                                        <Text className="stat-label">Total Entries:</Text>
                                        <Text className="stat-value">
                                            {loadingCount ? '...' : entryCount}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>

                     
                        <Flex direction="column" gap="5" style={{ flex: 1 }}>
                            
                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'blackchancery',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
                                        fontSize: '34px',
                                        textAlign: 'center'
                                    }}
                                >
                                    Emotion Insights
                                </Text>

                                {loadingStats ? (
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        style={{
                                            padding: '3rem',
                                            minHeight: '400px',
                                        }}
                                    >
                                        <Text
                                            size="4"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                color: 'rgba(44, 24, 16, 0.6)',
                                                fontSize: '34px',
                                            }}
                                        >
                                            Loading your emotional journey...
                                        </Text>
                                    </Flex>
                                ) : emotionStats.length === 0 ? (
                                    <Flex
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        style={{
                                            padding: '3rem',
                                            background: 'rgba(249, 246, 240, 0.3)',
                                            borderRadius: '8px',
                                            border: '1px dashed rgba(44, 24, 16, 0.3)',
                                            minHeight: '400px',
                                        }}
                                    >
                                        <Text
                                            size="4"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                color: 'rgba(44, 24, 16, 0.6)',
                                                textAlign: 'center',
                                                fontSize: '34px',
                                            }}
                                        >
                                            📊 No entries yet
                                        </Text>
                                        <Text
                                            size="2"
                                            style={{
                                                fontFamily: 'blackchancery',
                                                color: 'rgba(44, 24, 16, 0.5)',
                                                textAlign: 'center',
                                                marginTop: '0.5rem',
                                                fontStyle: 'italic',
                                                fontSize: '24px',
                                            }}
                                        >
                                            Start writing to track your emotions
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Box
                                        style={{
                                            background: 'rgba(249, 246, 240, 0.3)',
                                            borderRadius: '8px',
                                            border: '1px dashed rgba(44, 24, 16, 0.3)',
                                            padding: '1rem',
                                        }}
                                    >
                                        <ResponsiveContainer width="100%" height={400}>
                                            <PieChart>
                                                <Pie
                                                    data={emotionStats}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={120}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    style={{ fontFamily: 'blackchancery', fontSize: '25px',  }}
                                                >
                                                    {emotionStats.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        fontFamily: 'blackchancery',
                                                        background: '#93aa73',
                                                        border: '1px solid rgba(44, 24, 16, 0.3)',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <Legend
                                                    wrapperStyle={{ fontFamily: 'blackchancery', fontSize: '22px',  }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>
                                )}
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

           
            <Box className="danger-zone" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto 0' }}>
                <Text
                    size="5"
                    weight="bold"
                    style={{
                        fontFamily: 'blackchancery',
                        color: '#c6d2b6',
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '28px',
                    }}
                >
                    Finished Your Journey?
                </Text>
                <Separator size="4" style={{ background: '#c6d2b6', marginBottom: '1rem' }} />
                <Text
                    size="2"
                    style={{
                        fontFamily: 'blackchancery',
                        color: '#c6d2b6',
                        display: 'block',
                        marginBottom: '1rem',
                        fontSize: '20px',
                    }}
                >
                    Once you delete your account, there is no going back. Your journal will be permanently removed.
                </Text>
                <Button
                    size="3"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    style={{
                        fontFamily: 'nordic chance',
                        background: '#8b1a1a',
                        color: 'white',
                        fontSize: '34px',
                    }}
                >
                    {isDeleting ? 'Deleting Account...' : 'Delete Account'}
                </Button>
            </Box>
        </Container>
    );
}