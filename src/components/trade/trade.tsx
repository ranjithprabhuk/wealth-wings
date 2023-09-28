import { Container, SimpleGrid, useMantineTheme, Box, TextInput, Button, NumberInput, Flex } from '@mantine/core';
import { useCallback, useState } from 'react';
import { FtTickerChart } from './charts/FT-ticker-chart';
import { WebsocketProvider } from '../../store/websocket-provider';
import { FtRenkoChart } from './charts/ft-renko-chart';

export default function Trade() {
  const theme = useMantineTheme();
  const [formState, setFormState] = useState<Record<string, string | number>>({
    niftyFut: '35048',
    bankNiftyFut: '35048',
    quantity: 50,
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    setFormState(prevState => {
      return { ...prevState, [key]: value };
    });
  };

  const handleSubscribe = useCallback(() => {
    setIsSubscribed(true);
  }, [formState]);

  return (
    <Container my="md" fluid>
      <WebsocketProvider>
        <Box>
          <Box>
            <SimpleGrid
              cols={6}
              spacing="lg"
              breakpoints={[
                { maxWidth: 'md', cols: 3, spacing: 'md' },
                { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                { maxWidth: 'xs', cols: 1, spacing: 'sm' },
              ]}
            >
              <div>
                <Box>
                  <TextInput
                    label="Nifty FUT"
                    value={formState.niftyFut as number}
                    disabled={isSubscribed}
                    onChange={e => handleChange('niftyFut', e.target.value)}
                  />
                </Box>
              </div>
              <div>
                <Box>
                  <TextInput
                    label="Bank Nifty FUT"
                    value={formState.bankNiftyFut as number}
                    disabled={isSubscribed}
                    onChange={e => handleChange('bankNiftyFut', e.target.value)}
                  />
                </Box>
              </div>
              <div>
                <Box>
                  <TextInput
                    label="CALL Symbol"
                    value={formState.callSymbol as string}
                    disabled={isSubscribed}
                    onChange={e => handleChange('callSymbol', e.target.value)}
                  />
                </Box>
              </div>
              <div>
                <Box>
                  <TextInput
                    label="PUT Symbol"
                    disabled={isSubscribed}
                    value={formState.putSymbol as string}
                    onChange={e => handleChange('putSymbol', e.target.value)}
                  />
                </Box>
              </div>
              <div>
                <Box>
                  <NumberInput
                    label="Qty"
                    value={formState.quantity as number}
                    disabled={isSubscribed}
                    onChange={value => handleChange('quantity', value)}
                  />
                </Box>
              </div>
              <Box display={'flex'} style={{ justifyContent: 'end', alignItems: 'end' }}>
                <Box>
                  <Button onClick={handleSubscribe}>Subscribe</Button>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
          {isSubscribed && (
            <Box mt={12}>
              <SimpleGrid
                cols={2}
                spacing="lg"
                breakpoints={[
                  { maxWidth: 'md', cols: 2, spacing: 'md' },
                  { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                  { maxWidth: 'xs', cols: 1, spacing: 'sm' },
                ]}
              >
                <Box>
                  <SimpleGrid
                    cols={2}
                    spacing="lg"
                    breakpoints={[
                      { maxWidth: 'md', cols: 2, spacing: 'md' },
                      { maxWidth: 'sm', cols: 1, spacing: 'sm' },
                      { maxWidth: 'xs', cols: 1, spacing: 'sm' },
                    ]}
                  >
                    <Box>
                      <Flex style={{ justifyContent: 'flex-start' }}>
                        <Box>
                          <Button variant="filled" color="green">
                            Buy CALL &uarr;
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                    <Box>
                      <Flex style={{ justifyContent: 'flex-end' }}>
                        <Box>
                          <Button variant="filled" color="red">
                            Buy PUT &darr;
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Box>
                    <FtTickerChart exchange="NFO" tickerId={formState.niftyFut as string} />
                  </Box>

                  {/* <Box>
                  <ZerodhaTickerChart tickerId={formState.bankNiftyFut as number} />
                </Box> */}
                </Box>
                <Box>
                  {/* <Box>
                  <ZerodhaRenkoChart tickerId={formState.niftyFut as number} brickSize={2} />
                </Box>

                <Box>
                <ZerodhaRenkoChart tickerId={formState.bankNiftyFut as number} brickSize={2} />
                </Box> */}
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </Box>
        {isSubscribed && (
          <Box>
            <FtRenkoChart brickSize={3} exchange="NFO" tickerId={formState.niftyFut as string} />
          </Box>
        )}
        <Box>{/* <RenkoChart brickSize={2} /> */}</Box>
        <Box>{/* <RenkoChart brickSize={3} /> */}</Box>
      </WebsocketProvider>
    </Container>
  );
}
