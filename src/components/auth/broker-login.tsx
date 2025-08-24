import { Container, Grid, Title, Text, Divider, Box, Stack } from '@mantine/core';
import { ZerodhaLogin } from './zerodha-login';
import { FyersLogin } from './fyers-login';

export function BrokerLogin() {
  return (
    <Container size="xl" my={40}>
      <Box mb={40}>
        <Title ta="center" mb="md">
          Broker Authentication
        </Title>
        <Text ta="center" c="dimmed" size="lg">
          Choose your preferred broker to connect and start trading
        </Text>
      </Box>

      <Grid gutter="xl" align="stretch" pos="relative">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack h="100%">
            <ZerodhaLogin />
          </Stack>
        </Grid.Col>

        {/* Vertical divider for desktop */}
        <Box
          pos="absolute"
          left="50%"
          top="25%"
          h="50%"
          style={{ transform: 'translateX(-50%)', zIndex: 1 }}
          hiddenFrom="base"
          visibleFrom="md"
        >
          <Divider orientation="vertical" size="sm" color="gray.3" h="100%" />
        </Box>

        <Grid.Col span={{ base: 12, md: 6 }}>
          {/* Horizontal divider for mobile */}
          <Box mb="xl" hiddenFrom="md">
            <Divider label="OR" labelPosition="center" color="gray.3" />
          </Box>

          <Stack h="100%">
            <FyersLogin />
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
