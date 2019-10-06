const API_URL = 'https://luko.ntag.fr';

const queryApi = async ({ method = 'GET', path, body } : { method?: string, path: string, body?: any }) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(API_URL + path, options);

  return response.json();
};

export const getCategories = () => {
  return queryApi({ path: '/categories' });
};
export const createItem = (data) => {
  return queryApi({ method: 'POST', path: '/items', body: data });
};
export const getItems = () => {
  return queryApi({ path: '/items' });
};
