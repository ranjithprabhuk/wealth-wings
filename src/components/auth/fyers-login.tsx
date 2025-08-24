import { TextInput, Paper, Title, Button, Alert, Text, Group, Box } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconInfoCircle, IconCheck, IconX } from '@tabler/icons-react';
import { FyersService, getFyersConfig, validateEnvironment } from '../../services/fyers/fyers-service';
import { getLocalStorageValue } from '../../utils/localStorage/getLocalStorageValue';
import { setLocalStorageValue } from '../../utils/localStorage/setLocalStorageValue';

export function FyersLogin() {
  const navigate = useNavigate();

  const [validatingToken, setValidatingToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Validate access token by making API call
  const validateAccessToken = async (token: string) => {
    try {
      setValidatingToken(true);
      const profile = await FyersService.getProfile();
      setUserProfile(profile.data);
      setIsAuthenticated(true);
      setSuccess(`Valid token found. Welcome, ${profile.data.display_name || profile.data.name}!`);
      return true;
    } catch (err) {
      console.error('Token validation failed:', err);
      // Clear invalid token
      setLocalStorageValue('fyers-access-token', '');
      setLocalStorageValue('fyers-auth-timestamp', '');
      setIsAuthenticated(false);
      setUserProfile(null);
      return false;
    } finally {
      setValidatingToken(false);
    }
  };

  // Initialize and check authentication
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        validateEnvironment();

        // Check if access token already exists
        const existingToken = getLocalStorageValue('fyers-access-token');
        if (existingToken) {
          // Validate the token by making API call
          await validateAccessToken(existingToken);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Fyers service');
      }
    };

    initializeAuth();
  }, []);

  const handleLoginRedirect = () => {
    try {
      setError(null);
      const authUrl = FyersService.generateAuthUrl();
      window.location.href = authUrl;
      setSuccess('Redirected to Fyers login. Please complete authentication and copy the auth code.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate auth URL');
    }
  };

  const handleLogout = () => {
    // Clear stored tokens
    setLocalStorageValue('fyers-access-token', '');
    setLocalStorageValue('fyers-auth-timestamp', '');

    setIsAuthenticated(false);
    setUserProfile(null);
    setSuccess(null);
    setError(null);
  };

  const proceedToTrade = () => {
    navigate('/trade');
  };

  return (
    <Box>
      <Title ta="center">Fyers Login</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {error && (
          <Alert icon={<IconX size="1rem" />} title="Error" color="red" mb="md">
            {error}
          </Alert>
        )}

        {success && (
          <Alert icon={<IconCheck size="1rem" />} title="Success" color="green" mb="md">
            {success}
          </Alert>
        )}

        {validatingToken && (
          <Alert icon={<IconInfoCircle size="1rem" />} title="Validating Token" color="blue" mb="md">
            <Text size="sm">Checking if your existing access token is valid...</Text>
          </Alert>
        )}

        {!validatingToken && !isAuthenticated ? (
          <>
            <Alert icon={<IconInfoCircle size="1rem" />} title="Authentication Steps" mb="md">
              <Text size="sm">
                1. Click "Login with Fyers" to open the authentication page
                <br />
                2. Complete login on Fyers website
                <br />
                3. Copy the auth code from the callback URL
                <br />
                4. Paste it below and click "Generate Access Token"
              </Text>
            </Alert>

            <Button fullWidth mb="md" onClick={handleLoginRedirect}>
              Login with Fyers
            </Button>
          </>
        ) : (
          <>
            <Alert icon={<IconCheck size="1rem" />} title="Authenticated" color="green" mb="md">
              <Text size="sm">You are successfully authenticated with Fyers.</Text>
              {userProfile && (
                <Box mt="xs">
                  <Text size="sm" fw={500}>
                    Welcome, {userProfile.display_name || userProfile.name}!
                  </Text>
                  <Text size="xs" c="dimmed">
                    Fyers ID: {userProfile.fy_id}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Email: {userProfile.email_id}
                  </Text>
                </Box>
              )}
            </Alert>

            <Group grow>
              <Button onClick={proceedToTrade}>Go to Trading</Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </Group>
          </>
        )}
      </Paper>
    </Box>
  );
}
