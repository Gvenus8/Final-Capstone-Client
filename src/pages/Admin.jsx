import { useState, useEffect } from 'react';
import { getAllUsers, getStatistics, deleteUser } from '../services/adminService';
import { Container, Heading, Text, Flex, Card, Button, Box, Separator, Table } from '@radix-ui/themes';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingUserId, setDeletingUserId] = useState(null);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [usersData, statsData] = await Promise.all([
                getAllUsers(),
                getStatistics()
            ]);

            setUsers(usersData);
            setStatistics(statsData);
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setError("Didn't load, do it again later.");
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteUser = async (userId, displayName) => {
        if (!window.confirm(`Confirm deletion of user "${displayName}"? `)) {
            return;
        }

        setDeletingUserId(userId);

        try {
            await deleteUser(userId);

            // Refresh data after deletion
            await fetchAdminData();
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed ');
        } finally {
            setDeletingUserId(null);
        }
    };

    if (loading) {
        return (
            <Container size="3" style={{ paddingTop: '2rem' }}>
                <Text>Loading...</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="3" style={{ paddingTop: '2rem' }}>
                <Text color="red">{error}</Text>
            </Container>
        );
    }
    return (
        <Container size="4" style={{ paddingTop: '2rem' }}>
            <Flex direction="column" gap="5">
                <Heading size="8">👑 Admin Panel</Heading>

                {/* Stat section */}
                <Flex gap="4" wrap="wrap">
                    <Card style={{ flex: 1, minWidth: '200px' }}>
                        <Flex direction="column" gap="2" p="4">
                            <Text size="2" style={{ color: 'var(--gray-11)' }}>Total Users</Text>
                            <Heading size="7">{statistics?.totalUsers || 0}</Heading>
                        </Flex>
                    </Card>

                    <Card style={{ flex: 1, minWidth: '200px' }}>
                        <Flex direction="column" gap="2" p="4">
                            <Text size="2" style={{ color: 'var(--gray-11)' }}>Total Entries</Text>
                            <Heading size="7">{statistics?.totalEntries || 0}</Heading>
                        </Flex>
                    </Card>
                </Flex>

                {/* ET Section */}
                <Card>
                    <Flex direction="column" gap="3" p="4">
                        <Heading size="5">Most Used Entry Types</Heading>
                        <Separator size="4" />
                        <Flex direction="column" gap="2">
                            {statistics?.mostUsedEntryTypes?.map((entryType, index) => (
                                <Flex key={index} justify="between" align="center">
                                    <Text size="3">{entryType.type}</Text>
                                    <Text size="3" weight="bold" style={{ color: 'var(--accent-9)' }}>
                                        {entryType.count} entries
                                    </Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Card>

                {/* User section */}
                <Card>
                    <Flex direction="column" gap="3" p="4">
                        <Heading size="5">User Management</Heading>
                        <Separator size="4" />

                        {users.length === 0 ? (
                            <Text size="3" style={{ color: 'var(--gray-11)' }}>No users found</Text>
                        ) : (
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Display Name</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Entries</Table.ColumnHeaderCell>
                                        
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {users.map((user) => (
                                        <Table.Row key={user.id}>
                                            <Table.Cell>{user.displayName}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.entryCount}</Table.Cell>
                                            <Table.Cell>
                                                {user.isAdmin ? (
                                                    <Text size="2" weight="bold" style={{ color: 'var(--amber-11)' }}>
                                                        Admin
                                                    </Text>
                                                ) : (
                                                    <Text size="2" style={{ color: 'var(--gray-11)' }}>
                                                        User
                                                    </Text>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    size="1"
                                                    variant="soft"
                                                    color="red"
                                                    onClick={() => handleDeleteUser(user.id, user.displayName)}
                                                    disabled={deletingUserId === user.id || user.isAdmin}
                                                >
                                                    {deletingUserId === user.id ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        )}
                    </Flex>
                </Card>
            </Flex>
        </Container>
    );
}
