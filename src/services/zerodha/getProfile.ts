import { zerodhaFetchWrapper } from './zerodhaFetchWrapper';

export async function getZerodhaProfile(): Promise<any> {
  return await zerodhaFetchWrapper('/user/profile/full', 'GET');
}
