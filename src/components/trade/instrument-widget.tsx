import { Box, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../../store/websocket-provider';

interface IInstrumentWidget {
  name: string;
  instrumentToken: string;
  exchange: string;
}

export default function InstrumentWidget(props: IInstrumentWidget) {
  const { subscribeToInstrument, unSubscribeToInstrument, socketData } = useContext(WebsocketContext);
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (props.instrumentToken && props.exchange) {
      subscribeToInstrument(props.exchange, props.instrumentToken);
    }

    return () => {
      unSubscribeToInstrument(props.exchange, props.instrumentToken);
    };
  }, [props.instrumentToken, props.exchange]);

  useEffect(() => {
    if (socketData?.[props.instrumentToken]?.['lp']) {
      setPrice(socketData?.[props.instrumentToken]?.['lp']);
    }
  }, [socketData?.[props.instrumentToken]?.['lp']]);

  return (
    <Box display={'flex'} style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <Box>
        <Text size="md">{props.name}</Text>
      </Box>
      <Box>
        <Text size="md" c={'blue'}>
          {price || 'Loading...'}
        </Text>
      </Box>
    </Box>
  );
}
