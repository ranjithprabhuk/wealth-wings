import { Box, Text } from '@mantine/core';
import { useContext, useEffect } from 'react';
import { WebsocketContext } from '../../store/websocket-provider';

interface IInstrumentWidget {
  name: string;
  instrumentToken: string;
  exchange: string;
}

export default function InstrumentWidget(props: IInstrumentWidget) {
  const { subscribeToInstrument, unSubscribeToInstrument, socketData } = useContext(WebsocketContext);

  useEffect(() => {
    if (props.instrumentToken && props.exchange) {
      subscribeToInstrument(props.exchange, props.instrumentToken);
    }

    return () => {
      unSubscribeToInstrument(props.exchange, props.instrumentToken);
    };
  }, [props.instrumentToken, props.exchange]);

  return (
    <Box display={'flex'} style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <Box>
        <Text size="md">{props.name}</Text>
      </Box>
      <Box>
        <Text size="md" c={'blue'}>
          {socketData?.[props.name]?.['lp'] || 'Loading...'}
        </Text>
      </Box>
    </Box>
  );
}
