import { Container, SimpleGrid, useMantineTheme, Box, TextInput, Button, NumberInput, Flex } from '@mantine/core';
import { useCallback, useState } from 'react';
import { ZerodhaTickerChart } from './charts/zero-ticker-chart';
import { RenkoChart } from './charts/renko-chart';
import { ZerodhaRenkoChart } from './charts/zerodha-renko-chart';

export function Trade() {
  const theme = useMantineTheme();
  const [formState, setFormState] = useState<Record<string, string | number>>({
    niftyFut: 8972290,
    bankNiftyFut: 8972034,
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

  console.log('isSubscrivd', isSubscribed);

  return (
    <Container my="md" fluid>
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
                <NumberInput
                  label="Nifty FUT"
                  value={formState.niftyFut as number}
                  disabled={isSubscribed}
                  onChange={value => handleChange('niftyFut', value)}
                />
              </Box>
            </div>
            <div>
              <Box>
                <NumberInput
                  label="Bank Nifty FUT"
                  value={formState.bankNiftyFut as number}
                  disabled={isSubscribed}
                  onChange={value => handleChange('bankNiftyFut', value)}
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
              {/* <Box>
                <Box>
                  <ZerodhaTickerChart tickerId={formState.niftyFut as number} />
                </Box>

                <Box>
                  <ZerodhaTickerChart tickerId={formState.bankNiftyFut as number} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <ZerodhaRenkoChart tickerId={formState.niftyFut as number} brickSize={2} />
                </Box>

                <Box>
                <ZerodhaRenkoChart tickerId={formState.bankNiftyFut as number} brickSize={2} />
                </Box>
              </Box> */}
            </SimpleGrid>
          </Box>
        )}
      </Box>
      <Box>
        <RenkoChart brickSize={1} />
      </Box>
      <Box>
        <RenkoChart brickSize={2} />
      </Box>
      <Box>
        <RenkoChart brickSize={3} />
      </Box>
    </Container>
  );
}
