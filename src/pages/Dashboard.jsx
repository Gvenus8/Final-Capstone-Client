import { useAuth } from '../contexts/AuthContext';
import { Container, Heading, Text, Flex, Button, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
     

        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
        <Container size="3">
            <Flex
                direction="column"
                align="center"
                justify="center"
                style={{ minHeight: '70vh', textAlign: 'center', 
                 
                }}
                gap="6"
            >
                {/* Main Greeting-----stretch*/}
                <Heading size="9" style={{ color: 'var(--accent-9)' }}>
                    Welcome, {user?.displayName}
                </Heading>

            
                <Text size="5" style={{ color: 'var(--gray-11)', maxWidth: '600px' }}>
                        Welcome to Unsaid                   
                    Your safe space to release, reflect, and heal.
                </Text>

                {/* Cloud animation will go here later ----stretch  */}
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        height: '300px',
                        width: '100%',
                        marginTop: '2rem',
                        marginBottom: '2rem',
                    }}
                >
                    <Text size="8" style={{ opacity: 0.3 }}>
                       
                    </Text>
                </Flex>

               
                <Flex gap="4">
                    <Button
                        size="4"
                        onClick={() => navigate('/entries/new')}
                    >
                        Create Your First Entry
                    </Button>
                    <Button
                        size="4"
                        variant="soft"
                        onClick={() => navigate('/entries')}
                    >
                        View My Journal
                    </Button>
                </Flex>
            </Flex>
        </Container>
        </motion.div>
       
    );
}