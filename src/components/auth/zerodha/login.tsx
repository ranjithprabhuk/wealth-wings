import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getLocalStorageValue } from '../../../utils/localStorage/getLocalStorageValue';
import { setLocalStorageValue } from '../../../utils/localStorage/setLocalStorageValue';
import { loginToZerodha } from '../../../services/zerodha/loginToZerodha';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');

  async function hanldleLogin() {
    setLocalStorageValue('kite-userid', userId);
    const response = await loginToZerodha(password, totp);
    if (response && response.headers.length > 0) {
      setLocalStorageValue('zerodha-token', JSON.stringify(response.headers));
      navigate('/trade ');
    }
  }

  useEffect(() => {
    setUserId(getLocalStorageValue('kite-userid') || '');
  }, []);

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          value={userId}
          required
          onChange={e => setUserId(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          required
          mt="md"
          onChange={e => setPassword(e.target.value)}
        />
        <PasswordInput
          label="OTP"
          placeholder="OTP"
          required
          mt="md"
          value={totp}
          onChange={e => setTotp(e.target.value)}
        />

        <Button fullWidth mt="xl" onClick={hanldleLogin}>
          Connect to Zerodha
        </Button>
      </Paper>
    </Container>
  );
}
