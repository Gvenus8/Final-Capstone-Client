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


    // Emotion stats state
    const [emotionStats, setEmotionStats] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    // Fetch emotion stats on component mount
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
                // Format data for Recharts: [{ name: "Happy", value: 15 }, ...]
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

    // Colors for the pie chart
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
                .wax-seal {
                    width: 60px;
                    height: 60px;
                    background: radial-gradient(circle, #8b1a1a 0%, #5c0f0f 100%);
                    border-radius: 50%;
                    position: relative;
                    box-shadow: 
                        inset 0 2px 4px rgba(255, 255, 255, 0.3),
                        0 4px 8px rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid rgba(139, 26, 26, 0.8);
                }

                .wax-seal::after {
                    content: '✒️';
                    font-size: 24px;
                }

                .stat-label {
                    font-family: 'Caesar Dressing';
                    color: rgba(44, 24, 16, 0.7);
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .stat-value {
                    font-family: 'Caesar Dressing';
                    color: #2c1810;
                    font-size: 20px;
                    font-weight: bold;
                }

                .danger-zone {
                    background: rgba(255, 240, 240, 0.5);
                    border: 2px dashed rgba(139, 26, 26, 0.5);
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-top: 2rem;
                }
            `}</style>

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
                    position: 'relative',
                }}
            >
                <Flex direction="column" gap="5" align="center">
                    {/* Header with Wax Seal */}
                    <Flex direction="column" align="center" gap="3" style={{ marginTop: '2rem' }}>
                        <div className="wax-seal" />
                        <Heading
                            size="8"
                            style={{
                                fontFamily: 'Caesar Dressing',
                                color: '#2c1810',
                                textAlign: 'center',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                            }}
                        >
                            My Journey
                        </Heading>
                    </Flex>

                    {/* Error/Success Messages */}
                    {error && (
                        <Text
                            size="2"
                            style={{
                                fontFamily: 'Caesar Dressing',
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
                                fontFamily: 'Caesar Dressing',
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

                    {/* TWO COLUMN LAYOUT */}
                    <Flex gap="8" style={{ marginTop: '2rem', width: '100%' }}>
                        {/* LEFT COLUMN - Account Info & Stats */}
                        <Flex direction="column" gap="5" style={{ flex: 1 }}>
                            {/* Account Information Section */}
                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'Caesar Dressing',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
                                    }}
                                >
                                    Account Information
                                </Text>

                                <form onSubmit={handleSave}>
                                    <Flex direction="column" gap="4">
                                        {/* Email */}
                                        <Box>
                                            <Text className="stat-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                                                Scroll Address (Email)
                                            </Text>
                                            <Text
                                                size="3"
                                                style={{
                                                    fontFamily: 'Caesar Dressing',
                                                    color: '#2c1810',
                                                    padding: '0.5rem',
                                                    background: 'rgba(249, 246, 240, 0.5)',
                                                    borderRadius: '4px',
                                                    display: 'block',
                                                }}
                                            >
                                                {user?.email || ''}
                                            </Text>
                                            <Text
                                                size="1"
                                                style={{
                                                    fontFamily: 'Caesar Dressing',
                                                    color: 'rgba(44, 24, 16, 0.5)',
                                                    fontStyle: 'italic',
                                                    marginTop: '0.25rem',
                                                    display: 'block',
                                                }}
                                            >
                                                Email cannot be changed
                                            </Text>
                                        </Box>

                                        {/* Display Name */}
                                        <Box>
                                            <Text className="stat-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
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
                                                        fontFamily: 'Caesar Dressing',
                                                    }}
                                                />
                                            ) : (
                                                <Text
                                                    size="3"
                                                    style={{
                                                        fontFamily: 'Caesar Dressing',
                                                        color: '#2c1810',
                                                        padding: '0.5rem',
                                                        background: 'rgba(249, 246, 240, 0.5)',
                                                        borderRadius: '4px',
                                                        display: 'block',
                                                    }}
                                                >
                                                    {displayName}
                                                </Text>
                                            )}
                                        </Box>

                                        {/* Edit/Save Buttons */}
                                        {!isEditing ? (
                                            <Button
                                                type="button"
                                                size="3"
                                                onClick={() => setIsEditing(true)}
                                                style={{
                                                    width: '70%',
                                                    fontFamily: 'Caesar Dressing',
                                                    background: '#5d7a4a',
                                                    color: 'white',
                                                }}
                                            >
                                                ✎ Edit Profile
                                            </Button>
                                        ) : (
                                            <Flex gap="3">
                                                <Button
                                                    type="submit"
                                                    size="3"
                                                    disabled={isSaving}
                                                    style={{
                                                        flex: 1,
                                                        fontFamily: 'Caesar Dressing',
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
                                                        fontFamily: 'Caesar Dressing',
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

                            {/* Account Stats Section */}
                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'Caesar Dressing',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
                                    }}
                                >
                                    Chronicle Records
                                </Text>

                                <Flex direction="column" gap="3">
                                    {/* Member Since */}
                                    <Flex justify="between" align="center">
                                        <Text className="stat-label">Journey Began:</Text>
                                        <Text className="stat-value">
                                            {new Date().toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </Text>
                                    </Flex>

                                    {/* Total Entries */}
                                    <Flex justify="between" align="center">
                                        <Text className="stat-label">Total Entries:</Text>
                                        <Text className="stat-value">
                                            {loadingCount ? '...' : entryCount}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>

                        {/* RIGHT COLUMN - Emotion Insights */}
                        <Flex direction="column" gap="5" style={{ flex: 1 }}>
                            {/* Emotion Insights Section */}
                            <Box>
                                <Text
                                    size="5"
                                    weight="bold"
                                    style={{
                                        fontFamily: 'Caesar Dressing',
                                        color: '#2c1810',
                                        display: 'block',
                                        marginBottom: '1.5rem',
                                        borderBottom: '2px solid rgba(44, 24, 16, 0.3)',
                                        paddingBottom: '0.5rem',
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
                                                fontFamily: 'Caesar Dressing',
                                                color: 'rgba(44, 24, 16, 0.6)',
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
                                                fontFamily: 'Caesar Dressing',
                                                color: 'rgba(44, 24, 16, 0.6)',
                                                textAlign: 'center',
                                            }}
                                        >
                                            📊 No entries yet
                                        </Text>
                                        <Text
                                            size="2"
                                            style={{
                                                fontFamily: 'Caesar Dressing',
                                                color: 'rgba(44, 24, 16, 0.5)',
                                                textAlign: 'center',
                                                marginTop: '0.5rem',
                                                fontStyle: 'italic',
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
                                                    style={{ fontFamily: 'Caesar Dressing', fontSize: '12px' }}
                                                >
                                                    {emotionStats.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        fontFamily: 'Caesar Dressing',
                                                        background: 'rgba(249, 246, 240, 0.95)',
                                                        border: '1px solid rgba(44, 24, 16, 0.3)',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <Legend
                                                    wrapperStyle={{ fontFamily: 'Caesar Dressing', fontSize: '12px' }}
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

            {/* Danger Zone - OUTSIDE the notebook */}
            <Box className="danger-zone" style={{ width: '100%', maxWidth: '800px', margin: '2rem auto 0' }}>
                <Text
                    size="5"
                    weight="bold"
                    style={{
                        fontFamily: 'Caesar Dressing',
                        color: '#8b1a1a',
                        display: 'block',
                        marginBottom: '0.5rem',
                    }}
                >
                    ⚠️ Danger Zone
                </Text>
                <Separator size="4" style={{ background: 'rgba(139, 26, 26, 0.3)', marginBottom: '1rem' }} />
                <Text
                    size="2"
                    style={{
                        fontFamily: 'Caesar Dressing',
                        color: 'rgba(44, 24, 16, 0.8)',
                        display: 'block',
                        marginBottom: '1rem',
                    }}
                >
                    Once you delete your account, there is no going back. Your journal will be permanently removed.
                </Text>
                <Button
                    size="3"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    style={{
                        fontFamily: 'Caesar Dressing',
                        background: '#8b1a1a',
                        color: 'white',
                    }}
                >
                    {isDeleting ? 'Deleting Account...' : '🔥 Delete My Account'}
                </Button>
            </Box>
        </Container>
    );
}