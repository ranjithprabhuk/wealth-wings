import { zerodhaFetchWrapper } from './zerodhaFetchWrapper';

export async function getInstrumentData(
  instrumentToken: number,
  interval: string,
  startDate: string,
  endDate: string,
): Promise<any> {
  return await zerodhaFetchWrapper(
    `/instruments/historical/${instrumentToken}/${interval}?oi=1&from=${startDate}&to=${endDate}`,
    'GET',
  );
}
