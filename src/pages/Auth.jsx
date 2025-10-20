import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';


import { login as loginAPI, register as registerAPI } from '../services/authService';


import { Text, Flex, TextField, Button, Box } from '@radix-ui/themes';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await loginAPI({ email, password });
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await registerAPI({ email, password, displayName });
      login(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setDisplayName('');
  };
  return (
    <Box style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #e2cbf6 0%, #FFd6d6 25%, #E8F5E9 50%, #B2DFDB 75%, #A5D6A7 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradualGradient  10s ease-in-out infinite alternate',
          zIndex: 0,
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/forest-breathe4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
          mixBlendMode: 'overlay',
          zIndex: 1,
        }}
      />

      {<Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(243, 232, 232, 0.15) 100%)',
          zIndex: 2,
        }}
      />
      }
      <Flex
        direction="column"
        align="center"
        justify="flex-end"
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100vh',
          padding: '2rem',
          paddingTop: '60vh',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <div
            style={{
              backgroundColor: 'transparent !important',
            }}
          >
            <Flex direction="column" gap="5" p="5">

              {error && (
                <Text color="red" size="2">
                  {error}
                </Text>
              )}

             
              <form onSubmit={isLogin ? handleLogin : handleRegister}>
                <Flex direction="column" gap="4">
                  {!isLogin && (
                    <Box>
                      <Text as="label" size="3" mb="1" weight="bold"
                        style={{
                          fontFamily: "Caesar Dressing",
                          fontWeight: 400,
                          fontStyle: "normal",
                          color: '#666666ff',

                        }} >
                        Display Name
                      </Text>
                      <TextField.Root
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                        required
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '8px',
                          color: 'black',
                          fontFamily: "Caesar Dressing",
                          fontWeight: 400,
                          fontStyle: "normal",
                          fontSize: '16px',
                          padding: '14px 16px',
                          minHeight: '40px',
                        }}
                      />
                    </Box>
                  )}

                  
                  <Box>
                    <Text as="label" size="3" mb="1" variant="soft"
                      style={{
                        fontFamily: "Caesar Dressing",
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: '#666666ff'
                      }} >
                      Email
                    </Text>
                    <TextField.Root
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: 'black',
                        fontFamily: "Caesar Dressing",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: '16px',
                        padding: '14px 16px',
                        minHeight: '40px',
                      }}
                    />
                  </Box>

                 
                  <Box>
                    <Text as="label" size="3" mb="1" weight="bold"
                      style={{
                        fontFamily: "Caesar Dressing",
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: '#666666ff',
                        fontSize: '16px',
                        padding: '14px 16px',
                        minHeight: '40px',
                      }} >
                      Password
                    </Text>
                    <TextField.Root
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: 'Black',
                        fontFamily: "Caesar Dressing",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: '16px',
                        padding: '14px 16px',
                        minHeight: '40px',
                      }}
                    />
                  </Box>

                  
                  <Button type="submit" disabled={isLoading} size="3"
                    color="gray"
                    variant="soft"
                    style={{
                      fontFamily: "Caesar Dressing",
                      fontWeight: 400,
                      fontStyle: "normal",
                      color: '#666666ff',
                    }} >
                    {isLoading
                      ? (isLogin ? 'Logging in...' : 'Creating account...')
                      : (isLogin ? 'Login' : 'Create Account')
                    }
                  </Button>
                </Flex>
              </form>

              
              <Flex justify="center" mt="2">
                <Text size="2" color='black'
                  style={{
                    fontFamily: "Caesar Dressing",
                    fontWeight: 400,
                    fontStyle: "normal",
                    color: '#666666ff'
                  }} >
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Text
                    as="span"
                    style={{ color: 'var(--accent-9)', cursor: 'pointer', fontWeight: '500' }}
                    onClick={toggleMode}
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </div>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        </motion.div>
      </Flex>
      <style>{`
    @keyframes morningToEvening {
      0% 
      {
        background-position: 0% 0%;
        filter: hue-rotate(0deg);
      }
      50%
      {
        background-position: 100% 100%;
        filter: hue-rotate(15deg);
      }
      100%
      {
        background-position: 0% 0%;
        filter: hue-rotate(0deg);
      }
      }`}
      </style>
      <style>
        {`
    @keyframes gradualGradient {
     0%
      {
        opacity: 0;
        background-position: 0% 0%;
        filter: hue-rotate(0deg);
    }
    15% 
      {
        opacity: 0;
      }
    20% 
     {
        opacity: 0.3;
        background-position: 20% 20%;
        filter: hue-rotate(5deg);
      }
    50%
      {
        opacity: 0.8;
        background-position: 100% 100%;
        filter: hue-rotate(15deg);
      }
    80%
      {
        opacity: 0.6;
        background-position: 50% 50%;
        filter: hue-rotate(10deg);
      }
    100% 
      {
        opacity: 0.4;
        background-position: 0% 0%;
        filter: hue-rotate(0deg);
      }
}
`}</style>
    </Box>
  );
}
