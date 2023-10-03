import { Box, Loader } from '@mantine/core';

export const PageLoader = () => (
  <Box display={'flex'} style={{ width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <Loader size={30} />
  </Box>
);
