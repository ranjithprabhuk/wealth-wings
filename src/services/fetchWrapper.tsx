export async function fetchWrapper(requestUrl: RequestInfo | URL, request?: RequestInit): Promise<any> {
  return await fetch(requestUrl, request)
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      return data;
    })
    .catch(err => {
      console.log('errr', err);
      return err;
    });
}
