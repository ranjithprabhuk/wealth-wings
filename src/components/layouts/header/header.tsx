import { Container, Group, Burger, Paper, Text, Transition, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import { Link, useLocation } from 'react-router-dom';
import InstrumentWidget from '../../trade/instrument-widget';
import { useEffect, useState } from 'react';
import { getMarketWatchList } from '../../../services/market/marketwatch';
import { IMarketWatch } from '../../../types/marketwatch';

interface IHeader {
  links: { link: string; label: string }[];
}

export function Header({ links }: IHeader) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  const items = links.map(link => (
    <Link
      key={link.label}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
      to={link.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container fluid size="md" style={{ height: '100%' }}>
      <Box display={'flex'} style={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <Box>
          <Text fz="lg" fw={700}>
            Wealth Wings
          </Text>
        </Box>

        <InstrumentWidgets />

        <Box>
          <Group visibleFrom="xs">{items}</Group>
        </Box>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {styles => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Box>
    </Container>
  );
}

function InstrumentWidgets() {
  const [instrumentList, setInstrumentList] = useState<IMarketWatch[]>([]);

  useEffect(() => {
    getMarketWatchList('5').then(result => setInstrumentList(result.values || []));
  }, []);

  console.log('instrumentList', instrumentList);

  return instrumentList.map(instrument => (
    <InstrumentWidget
      key={instrument.token}
      name={instrument.tsym}
      exchange={instrument.exch}
      instrumentToken={instrument.token}
    />
  ));
}
